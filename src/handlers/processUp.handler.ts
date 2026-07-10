import { DomainEvent } from "../events/event.types.js";
import { ProcessUpPayload } from "../events/event.payloads.js";
import { BaseEventHandler } from "./baseEventHandler.js";

export class ProcessUpHandler
  extends BaseEventHandler<ProcessUpPayload> {

  protected async beforeProcess(
    event: DomainEvent<ProcessUpPayload>
  ): Promise<void> {

    console.log("✅ Process Up");

    console.log(
      "Process :",
      event.payload.processName
    );
  }

}