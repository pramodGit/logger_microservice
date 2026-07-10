import { DomainEvent } from "../events/event.types.js";
import { ProcessDownPayload } from "../events/event.payloads.js";
import { BaseEventHandler } from "./baseEventHandler.js";

export class ProcessDownHandler
  extends BaseEventHandler<ProcessDownPayload> {

  protected async beforeProcess(
    event: DomainEvent<ProcessDownPayload>
  ): Promise<void> {

    console.log("🚨 Process Down");

    console.log(
      "Process :",
      event.payload.processName
    );
  }

}