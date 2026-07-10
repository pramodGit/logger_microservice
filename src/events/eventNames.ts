export const EVENT_NAMES = {
  CPU_HIGH: "cpu.high",
  MEMORY_HIGH: "memory.high",
  DISK_HIGH: "disk.high",
  PROCESS_DOWN: "process.down",
  PROCESS_UP: "process.up",
} as const;

export type EventType =
  (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];