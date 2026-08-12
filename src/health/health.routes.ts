import { Router } from "express";
import {
  checkMySqlHealth,
  checkKafkaHealth,
} from "./health.service.js";

import { APP_INFO } from "../config/app.js";

const router = Router();

router.get("/live", (_req, res) => {
  res.status(200).json({
    status: "UP",
  });
});

router.get("/ready", async (_req, res) => {
  const mysql = await checkMySqlHealth();
  const kafka = checkKafkaHealth();

  const ready =
    mysql === "UP" &&
    kafka === "UP";

  res.status(ready ? 200 : 503).json({
    status: ready ? "UP" : "DOWN",
    dependencies: {
      mysql,
      kafka,
    },
  });
});

router.get("/health", async (_req, res) => {
  const mysql = await checkMySqlHealth();
  const kafka = checkKafkaHealth();

  const healthy =
    mysql === "UP" &&
    kafka === "UP";

  res.status(healthy ? 200 : 503).json({
    status: healthy ? "UP" : "DOWN",
    service: APP_INFO.name,
    version: APP_INFO.version,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    dependencies: {
      mysql,
      kafka,
    },
  });
});

export default router;