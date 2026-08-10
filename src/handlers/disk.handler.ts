import { DomainEvent } from "../events/event.types.js";
import { DiskHighPayload } from "../events/event.payloads.js";
import { BaseEventHandler } from "./baseEventHandler.js";
import { logger } from "../logger/logger.js";

export class DiskHandler extends BaseEventHandler<DiskHighPayload> {

  protected async beforeProcess(
    event: DomainEvent<DiskHighPayload>
  ): Promise<void> {

    logger.info("Disk Event");

    logger.info(
      { usage: event.payload.usage },
      "Disk Usage"
    );
  }

}