import { Kafka } from "kafkajs";
import "dotenv/config";

const kafka = new Kafka({
  clientId: "logger-service",
  brokers: [process.env.KAFKA_BROKER!],
});

export const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();

  console.log("✅ Logger Producer Connected");
};