import { Kafka } from "kafkajs";
import "dotenv/config";

const kafka = new Kafka({
  clientId: "logger-service",
  brokers: [process.env.KAFKA_BROKER!],
});

export const consumer = kafka.consumer({
  groupId: process.env.GROUP_ID!,
});

export const connectConsumer = async () => {
  await consumer.connect();

  console.log("✅ Logger Consumer Connected");

  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC!,
    fromBeginning: false,
  });

  console.log(`📌 Subscribed to ${process.env.KAFKA_TOPIC}`);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;

      const event = JSON.parse(message.value.toString());

      console.log("\n==============================");
      console.log("📥 EVENT RECEIVED");
      console.log("==============================");

      console.log("Topic      :", topic);
      console.log("Partition  :", partition);
      console.log("Offset     :", message.offset);

      console.log("Payload");
      console.log(event);
    },
  });
};