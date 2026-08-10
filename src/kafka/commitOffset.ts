import { logger } from "../logger/logger.js";
import { consumer } from "./consumer.js";

export const commitOffset = async (
  topic: string,
  partition: number,
  offset: string
) => {
  await consumer.commitOffsets([
    {
      topic,
      partition,
      offset: (Number(offset) + 1).toString(),
    },
  ]);

  logger.info(
    {
      topic,
      partition,
      committedOffset: Number(offset) + 1,
    },
    "Kafka offset committed"
  );
};