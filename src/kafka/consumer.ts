import { Kafka } from "kafkajs";
import "dotenv/config";
import { isDomainEvent } from "../events/validator.js";
import { retry } from "../utils/retry.js";
import { commitOffset } from "./commitOffset.js";
import { publishDLQ } from "./publishDLQ.js";
import { routeEvent } from "../router/eventRouter.js";

const kafka = new Kafka({
  clientId: "logger-service",
  brokers: [process.env.KAFKA_BROKER!],
});

export const consumer = kafka.consumer({
  groupId: process.env.GROUP_ID!,
});

export const connectConsumer = async () => {
  await consumer.connect();

  console.log("✅ Logger Consumer Connected");

  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC!,
    fromBeginning: false,
  });

  console.log(`📌 Subscribed to ${process.env.KAFKA_TOPIC}`);

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value == null) {
        console.warn("Received empty Kafka message");
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

        await commitOffset(topic, partition, message.offset);

      } catch (err) {
        console.error("❌ Message Failed After Retries");

        await publishDLQ(
          rawMessage,
          err instanceof Error ? err.message : "Unknown Error"
        );

        await commitOffset(topic, partition, message.offset);

        console.log(`☠️ Sent to DLQ & Offset ${message.offset} committed`);
      }
    },
  });
};