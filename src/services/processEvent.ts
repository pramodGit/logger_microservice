import {
  DomainEvent,
  EVENT_VERSION,
  CpuHighPayloadV2,
} from "../events/event.types.js";

import {
  hasProcessed,
  markProcessed,
} from "../storage/processedEvents.js";

export const processEvent = async (
  event: DomainEvent
) => {
  switch (event.version) {
    case EVENT_VERSION.V1:
      return processV1(event);

    case EVENT_VERSION.V2:
      return processV2(event);

    default:
      throw new Error(
        `Unsupported Event Version : ${event.version}`
      );
  }
};

const processV1 = async (
  event: DomainEvent
) => {
  console.log("📦 Processing Version 1 Event");

  await process(event);
};

const processV2 = async (
  event: DomainEvent
) => {
  console.log("📦 Processing Version 2 Event");

  const payload = event.payload as CpuHighPayloadV2;

  console.log("Process Name :", payload.processName);
  console.log("CPU Core     :", payload.core);

  await process(event);
};

const process = async (
  event: DomainEvent
) => {
  console.log("Event ID :", event.eventId);
  console.log(
    "Already Processed :",
    hasProcessed(event.eventId)
  );

  if (hasProcessed(event.eventId)) {
    console.log(
      `⚠️ Duplicate Event Skipped : ${event.eventId}`
    );
    return;
  }

  console.log("\n==============================");
  console.log("📥 EVENT RECEIVED");
  console.log("==============================");

  console.log(event);

  console.log("💾 Saving to database...");

  await new Promise((resolve) =>
    setTimeout(resolve, 2000)
  );

  markProcessed(event.eventId);

  console.log("✅ Processing Successful");
};