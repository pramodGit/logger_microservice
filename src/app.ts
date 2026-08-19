import "dotenv/config";
import express from "express";

import { connectConsumer } from "./kafka/consumer.js";
import { connectProducer } from "./kafka/producer.js";
import { testDatabaseConnection } from "./database/testConnection.js";
import { logger } from "./logger/logger.js";
import healthRoutes from "./health/health.routes.js";
import metricsRouter from "./metrics/metrics.routes.js";

const app = express();

app.use(express.json());

app.use(healthRoutes);
app.use(metricsRouter);

const PORT = Number(process.env.PORT ?? 3001);

const start = async () => {
  await connectProducer();
  await testDatabaseConnection();
  await connectConsumer();

  app.listen(PORT, () => {
    logger.info(
      {
        port: PORT,
      },
      "Health API started"
    );
  });

  logger.info("Logger Microservice Started");
};

start();