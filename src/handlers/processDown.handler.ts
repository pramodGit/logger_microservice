import { DomainEvent } from "../events/event.types.js";
import { ProcessDownPayload } from "../events/event.payloads.js";
import { BaseEventHandler } from "./baseEventHandler.js";
import { logger } from "../logger/logger.js";

export class ProcessDownHandler
  extends BaseEventHandler<ProcessDownPayload> {

  protected async beforeProcess(
    event: DomainEvent<ProcessDownPayload>
  ): Promise<void> {

    logger.warn(
      {
        processName: event.payload.processName,
      },
      "Process down"
    );
  }
}