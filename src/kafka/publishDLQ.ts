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

  console.log("☠️ Published to DLQ");
};