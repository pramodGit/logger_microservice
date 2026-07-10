import {
  DomainEvent,
  EVENT_VERSION,
} from "./event.types.js";
import { EVENT_NAMES } from "./eventNames.js";

const SUPPORTED_VERSIONS = new Set<number>(
  Object.values(EVENT_VERSION)
);
const SUPPORTED_EVENT_NAMES = new Set<string>(
  Object.values(EVENT_NAMES)
);

export const isDomainEvent = (
  event: unknown
): event is DomainEvent => {
  if (typeof event !== "object" || event === null) {
    return false;
  }

  const e = event as Record<string, unknown>;

  return (
    typeof e.eventId === "string" &&
    SUPPORTED_EVENT_NAMES.has(e.eventType as string) &&
    typeof e.version === "number" &&
    SUPPORTED_VERSIONS.has(e.version) &&
    typeof e.source === "string" &&
    typeof e.serverId === "string" &&
    typeof e.timestamp === "string" &&
    typeof e.payload === "object" &&
    e.payload !== null
  );
};