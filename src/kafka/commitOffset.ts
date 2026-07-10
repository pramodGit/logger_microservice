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

  console.log(`✅ Offset ${offset} committed`);
};