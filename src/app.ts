import "dotenv/config";

import { connectConsumer } from "./kafka/consumer.js";

const start = async () => {
  await connectConsumer();

  console.log("Logger Microservice Started");
};

start();