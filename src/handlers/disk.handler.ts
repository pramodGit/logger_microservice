import { DomainEvent } from "../events/event.types.js";
import { DiskHighPayload } from "../events/event.payloads.js";
import { BaseEventHandler } from "./baseEventHandler.js";

export class DiskHandler extends BaseEventHandler<DiskHighPayload> {

  protected async beforeProcess(
    event: DomainEvent<DiskHighPayload>
  ): Promise<void> {

    console.log("📦 Disk Event");

    console.log(
      "Disk Usage :",
      event.payload.usage,
      "%"
    );
  }

}