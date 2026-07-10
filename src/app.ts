import "dotenv/config";

import { connectConsumer } from "./kafka/consumer.js";
import { connectProducer } from "./kafka/producer.js";

const start = async () => {

  await connectProducer();
  await connectConsumer();  

  console.log("Logger Microservice Started");
};

start();