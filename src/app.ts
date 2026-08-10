import "dotenv/config";

import { connectConsumer } from "./kafka/consumer.js";
import { connectProducer } from "./kafka/producer.js";
import { testDatabaseConnection } from "./database/testConnection.js";
import { logger } from "./logger/logger.js";

const start = async () => {

  await connectProducer();
  await testDatabaseConnection();
  await connectConsumer();  

  logger.info("Logger Microservice Started");
};

start();