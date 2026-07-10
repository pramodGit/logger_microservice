import { DomainEvent } from "../events/event.types.js";
import { handlerRegistry } from "../handlers/index.js";

export const routeEvent = async (
  event: DomainEvent
) => {
  const handler = handlerRegistry.get(event.eventType);

  if (!handler) {
    throw new Error(
      `No handler registered for '${event.eventType}'`
    );
  }

  await handler.handle(event);
};