import { Kafka } from "kafkajs";
import "dotenv/config";

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
};