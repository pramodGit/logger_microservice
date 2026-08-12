import { Kafka } from "kafkajs";
import "dotenv/config";
import { logger } from "../logger/logger.js";

const kafka = new Kafka({
  clientId: "logger-service",
  brokers: [process.env.KAFKA_BROKER!],
});

export const producer = kafka.producer();

export let isProducerConnected = false;

export const connectProducer = async () => {
  await producer.connect();

  isProducerConnected = true;

  logger.info("Logger Producer Connected");
};