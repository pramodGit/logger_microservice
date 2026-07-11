import "dotenv/config";

import { connectConsumer } from "./kafka/consumer.js";
import { connectProducer } from "./kafka/producer.js";
import { testDatabaseConnection } from "./database/testConnection.js";

const start = async () => {

  await connectProducer();
  await testDatabaseConnection();
  await connectConsumer();  

  console.log("Logger Microservice Started");
};

start();