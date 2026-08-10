import { DomainEvent } from "../events/event.types.js";
import { logger } from "../logger/logger.js";
import { eventRepository } from "../repositories/index.js";
import {
  hasProcessed,
  markProcessed,
} from "../storage/processedEvents.js";
import { EventHandler } from "./eventHandler.js";

export abstract class BaseEventHandler<T = unknown>
  implements EventHandler {

  async handle(
    event: DomainEvent<T>
  ): Promise<void> {

    logger.info(
      {
        eventId: event.eventId,
        eventType: event.eventType,
        version: event.version,
      },
      "Processing event"
    );

    if (hasProcessed(event.eventId)) {
      logger.warn(
        {
          eventId: event.eventId,
        },
        "Duplicate event skipped"
      );
      return;
    }

    await this.beforeProcess(event);

    logger.info(
      {
        eventId: event.eventId,
      },
      "Saving event"
    );

    await eventRepository.save(event);

    markProcessed(event.eventId);

    logger.info(
      {
        eventId: event.eventId,
      },
      "Event processed successfully"
    );
  }

  protected abstract beforeProcess(
    event: DomainEvent<T>
  ): Promise<void>;
}