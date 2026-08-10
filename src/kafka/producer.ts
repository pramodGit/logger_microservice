import { Kafka } from "kafkajs";
import "dotenv/config";
import { logger } from "../logger/logger";

const kafka = new Kafka({
  clientId: "logger-service",
  brokers: [process.env.KAFKA_BROKER!],
});

export const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();

  logger.info("Logger Producer Connected");
};