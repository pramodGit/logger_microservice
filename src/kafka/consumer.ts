import { Kafka } from "kafkajs";
import "dotenv/config";
import { isDomainEvent } from "../events/validator.js";
import { retry } from "../utils/retry.js";
import { commitOffset } from "./commitOffset.js";
import { publishDLQ } from "./publishDLQ.js";
import { routeEvent } from "../router/eventRouter.js";
import { logger } from "../logger/logger.js";

const kafka = new Kafka({
  clientId: "logger-service",
  brokers: [process.env.KAFKA_BROKER!],
});

export const consumer = kafka.consumer({
  groupId: process.env.GROUP_ID!,
});

export const connectConsumer = async () => {
  await consumer.connect();

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

      try {
      
        await retry(async () => {
          const parsedEvent = JSON.parse(rawMessage);

          if (!isDomainEvent(parsedEvent)) {
            throw new Error("Invalid Domain Event");
          }

          await routeEvent(parsedEvent);
        });

        await commitOffset(
          topic,
          partition,
          message.offset
        );

      } catch (err) {
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
          err instanceof Error ? err.message : "Unknown Error"
        );

        await commitOffset(topic, partition, message.offset);

        logger.warn(
          {
            topic,
            partition,
            offset: message.offset,
          },
          "Message sent to DLQ"
        );
      }
    },
  });
};