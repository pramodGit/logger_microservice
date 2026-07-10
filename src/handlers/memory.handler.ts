import { DomainEvent } from "../events/event.types.js";
import { MemoryHighPayload } from "../events/event.payloads.js";
import { BaseEventHandler } from "./baseEventHandler.js";

export class MemoryHandler extends BaseEventHandler<MemoryHighPayload> {

  protected async beforeProcess(
    event: DomainEvent<MemoryHighPayload>
  ): Promise<void> {

    console.log("📦 Memory Event");

    console.log(
      "Memory Usage :",
      event.payload.usage,
      "%"
    );
  }

}