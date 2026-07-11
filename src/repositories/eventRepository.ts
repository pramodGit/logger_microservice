import { DomainEvent } from "../events/event.types";

export interface EventRepository {
  save(event: DomainEvent): Promise<void>;
}