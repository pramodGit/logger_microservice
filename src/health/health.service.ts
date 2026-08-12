import { pool } from "../database/mysql.js";
import {
  isProducerConnected,
} from "../kafka/producer.js";
import {
  isConsumerConnected,
} from "../kafka/consumer.js";

export const checkMySqlHealth = async (): Promise<"UP" | "DOWN"> => {
  try {
    await pool.query("SELECT 1");
    return "UP";
  } catch {
    return "DOWN";
  }
};

export const checkKafkaHealth = (): "UP" | "DOWN" => {
  return isProducerConnected && isConsumerConnected
    ? "UP"
    : "DOWN";
};