import { DomainEvent, EVENT_VERSION } from "../events/event.types.js";
import { CpuHighPayloadV2 } from "../events/event.payloads.js";
import { BaseEventHandler } from "./baseEventHandler.js";
import { logger } from "../logger/logger.js";

export class CpuHandler extends BaseEventHandler<CpuHighPayloadV2> {
  protected async beforeProcess(
    event: DomainEvent<CpuHighPayloadV2>
  ): Promise<void> {
    switch (event.version) {
      case EVENT_VERSION.V1:
        logger.info("CPU Event V1");
        break;

      case EVENT_VERSION.V2:
        logger.info("CPU Event V2");

        if (event.payload.processName) {
          logger.info(
            { processName: event.payload.processName },
            "CPU Process"
          );
        }

        if (event.payload.core !== undefined) {
          logger.info(
            { processName: event.payload.processName },
            "CPU Core"
          );
        }

        break;

      default:
        throw new Error(
          `Unsupported Event Version : ${event.version}`
        );
    }
  }
}