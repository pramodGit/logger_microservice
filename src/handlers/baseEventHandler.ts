import { DomainEvent } from "../events/event.types.js";
import {
  hasProcessed,
  markProcessed,
} from "../storage/processedEvents.js";
import { EventHandler } from "./eventHandler.js";

export abstract class BaseEventHandler<T = unknown>
  implements EventHandler<T>
{
  async handle(
    event: DomainEvent<T>
  ): Promise<void> {
    console.log("Event ID :", event.eventId);

    if (hasProcessed(event.eventId)) {
      console.log(
        `⚠️ Duplicate Event Skipped : ${event.eventId}`
      );
      return;
    }

    await this.beforeProcess(event);

    console.log("💾 Saving to database...");

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    markProcessed(event.eventId);

    console.log("✅ Processing Successful");
  }

  protected abstract beforeProcess(
    event: DomainEvent<T>
  ): Promise<void>;
}