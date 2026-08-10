import { DomainEvent } from "../events/event.types.js";
import { MemoryHighPayload } from "../events/event.payloads.js";
import { BaseEventHandler } from "./baseEventHandler.js";
import { logger } from "../logger/logger.js";

export class MemoryHandler extends BaseEventHandler<MemoryHighPayload> {

  protected async beforeProcess(
    event: DomainEvent<MemoryHighPayload>
  ): Promise<void> {

    logger.info("Memory Event");

    logger.info(
      { usage: event.payload.usage },
      "Memory Usage"
    );
  }

}