import { DomainEvent, EVENT_VERSION } from "../events/event.types.js";
import { CpuHighPayloadV2 } from "../events/event.payloads.js";
import { BaseEventHandler } from "./baseEventHandler.js";

export class CpuHandler extends BaseEventHandler<CpuHighPayloadV2> {
  protected async beforeProcess(
    event: DomainEvent<CpuHighPayloadV2>
  ): Promise<void> {
    switch (event.version) {
      case EVENT_VERSION.V1:
        console.log("📦 CPU Event V1");
        break;

      case EVENT_VERSION.V2:
        console.log("📦 CPU Event V2");

        if (event.payload.processName) {
          console.log(
            "Process Name :",
            event.payload.processName
          );
        }

        if (event.payload.core !== undefined) {
          console.log(
            "CPU Core     :",
            event.payload.core
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