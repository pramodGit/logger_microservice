import { DomainEvent } from "../events/event.types.js";
import { ProcessUpPayload } from "../events/event.payloads.js";
import { BaseEventHandler } from "./baseEventHandler.js";
import { logger } from "../logger/logger.js";

export class ProcessUpHandler
  extends BaseEventHandler<ProcessUpPayload> {

  protected async beforeProcess(
    event: DomainEvent<ProcessUpPayload>
  ): Promise<void> {

    logger.info(
      {
        processName: event.payload.processName,
      },
      "Process up"
    );
  }
}