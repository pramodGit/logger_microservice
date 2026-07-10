import {
  DomainEvent,
  EVENT_VERSION,
} from "./event.types.js";

const SUPPORTED_VERSIONS = new Set<number>(
  Object.values(EVENT_VERSION)
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
    typeof e.eventType === "string" &&
    typeof e.version === "number" &&
    SUPPORTED_VERSIONS.has(e.version) &&
    typeof e.source === "string" &&
    typeof e.serverId === "string" &&
    typeof e.timestamp === "string" &&
    typeof e.payload === "object" &&
    e.payload !== null
  );
};