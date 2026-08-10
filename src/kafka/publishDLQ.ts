import { logger } from "../logger/logger.js";
import { producer } from "./producer.js";

export const publishDLQ = async (
  event: unknown,
  error: string
) => {
  await producer.send({
    topic: process.env.DLQ_TOPIC!,
    messages: [
      {
        value: JSON.stringify({
          failedAt: new Date().toISOString(),
          error,
          event,
        }),
      },
    ],
  });

  logger.warn(
    {
      topic: process.env.DLQ_TOPIC,
    },
    "Message published to DLQ"
  );
};