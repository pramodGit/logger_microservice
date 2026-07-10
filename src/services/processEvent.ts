import {
  hasProcessed,
  markProcessed,
} from "../storage/processedEvents.js";


export const processEvent = async (event: any) => {

  console.log("Event ID:", event.eventId);
  console.log("Already Processed:", hasProcessed(event.eventId));

  if (hasProcessed(event.eventId)) {
    console.log(`⚠️ Duplicate Event Skipped : ${event.eventId}`);
    return;
  }

  console.log("\n==============================");
  console.log("📥 EVENT RECEIVED");
  console.log("==============================");

  console.log(event);

  // Simulate Business Logic
  console.log("💾 Saving to database...");

  await new Promise(resolve => setTimeout(resolve, 2000));

  markProcessed(event.eventId);

  console.log("✅ Processing Successful");
};