import { Kafka } from "kafkajs";
import "dotenv/config";
import { isDomainEvent } from "../events/validator.js";
import { retry } from "../utils/retry.js";
import { commitOffset } from "./commitOffset.js";
import { publishDLQ } from "./publishDLQ.js";
import { routeEvent } from "../router/eventRouter.js";
import { logger } from "../logger/logger.js";
import {
  eventsProcessed,
  eventsFailed,
  eventsDLQ,
  eventProcessingDuration,
} from "../metrics/metrics.js";

const kafka = new Kafka({
  clientId: "logger-service",
  brokers: [process.env.KAFKA_BROKER!],
});

export const consumer = kafka.consumer({
  groupId: process.env.GROUP_ID!,
});

export let isConsumerConnected = false;

export const connectConsumer = async () => {
  await consumer.connect();

  isConsumerConnected = true;

  logger.info(
    {
      groupId: process.env.GROUP_ID,
    },
    "Kafka consumer connected"
  );

  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC!,
    fromBeginning: false,
  });

  logger.info(
    {
      topic: process.env.KAFKA_TOPIC,
    },
    "Subscribed to Kafka topic"
  );

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value == null) {
        logger.warn(
          {
            topic,
            partition,
          },
          "Received empty Kafka message"
        );

        return;
      }

      const rawMessage = message.value.toString();

      // Start processing timer
      const endTimer = eventProcessingDuration.startTimer();

      try {
        await retry(async () => {
          const parsedEvent = JSON.parse(rawMessage);

          if (!isDomainEvent(parsedEvent)) {
            throw new Error("Invalid Domain Event");
          }

          await routeEvent(parsedEvent);
        });

        // Business processing successful
        eventsProcessed.inc();

        await commitOffset(
          topic,
          partition,
          message.offset
        );

        logger.info(
          {
            topic,
            partition,
            offset: message.offset,
          },
          "Event processed successfully"
        );

      } catch (err) {

        // Processing failed after all retries
        eventsFailed.inc();

        logger.error(
          {
            topic,
            partition,
            offset: message.offset,
            error: err instanceof Error ? err.message : err,
          },
          "Message processing failed after retries"
        );

        await publishDLQ(
          rawMessage,
          err instanceof Error
            ? err.message
            : "Unknown Error"
        );

        // Message successfully moved to DLQ
        eventsDLQ.inc();

        await commitOffset(
          topic,
          partition,
          message.offset
        );

        logger.warn(
          {
            topic,
            partition,
            offset: message.offset,
          },
          "Message sent to DLQ"
        );
      } finally {

        // Stop processing timer
        endTimer();
      }
    },
  });
};