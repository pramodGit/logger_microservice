export const EVENT_VERSION = {
  V1: 1,
  V2: 2,
} as const;

export type EventVersion =
  (typeof EVENT_VERSION)[keyof typeof EVENT_VERSION];

export interface DomainEvent<T = unknown> {
  eventId: string;
  eventType: string;
  version: EventVersion;
  source: string;
  serverId: string;
  timestamp: string;
  payload: T;
}

/**
 * CPU Event Payload V1
 */
export interface CpuHighPayload {
  usage: number;
}

/**
 * CPU Event Payload V2
 * (Schema Evolution)
 */
export interface CpuHighPayloadV2 extends CpuHighPayload {
  processName?: string;
  core?: number;
}

export type CpuHighEvent = DomainEvent<CpuHighPayload>;
export type CpuHighEventV2 = DomainEvent<CpuHighPayloadV2>;