import client from "prom-client";

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

export const eventsProcessed = new client.Counter({
  name: "logger_events_processed_total",
  help: "Total number of events successfully processed",
  registers: [register],
});

export const eventsFailed = new client.Counter({
  name: "logger_events_failed_total",
  help: "Total number of events that failed processing",
  registers: [register],
});

export const eventsRetried = new client.Counter({
  name: "logger_events_retried_total",
  help: "Total number of event processing retry attempts",
  registers: [register],
});

export const eventsDLQ = new client.Counter({
  name: "logger_events_dlq_total",
  help: "Total number of events sent to the dead letter queue",
  registers: [register],
});

export const eventProcessingDuration = new client.Histogram({
  name: "logger_event_processing_duration_seconds",
  help: "Event processing duration in seconds",
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10],
  registers: [register],
});

export { register };