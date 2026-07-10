import { EventType } from "./eventNames.js";

export const EVENT_VERSION = {
  V1: 1,
  V2: 2,
} as const;

export type EventVersion =
  (typeof EVENT_VERSION)[keyof typeof EVENT_VERSION];

export interface DomainEvent<T = unknown> {
  eventId: string;
  eventType: EventType;
  version: EventVersion;
  source: string;
  serverId: string;
  timestamp: string;
  payload: T;
}