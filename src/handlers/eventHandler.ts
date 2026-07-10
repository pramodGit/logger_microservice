import { DomainEvent } from "../events/event.types.js";

export interface EventHandler<T = unknown> {
  handle(event: DomainEvent<T>): Promise<void>;
}