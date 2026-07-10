import { EventHandler } from "./eventHandler.js";

import { CpuHandler } from "./cpu.handler.js";
import { MemoryHandler } from "./memory.handler.js";
import { DiskHandler } from "./disk.handler.js";
import { ProcessDownHandler } from "./processDown.handler.js";
import { ProcessUpHandler } from "./processUp.handler.js";

import {
  EVENT_NAMES,
  EventType,
} from "../events/eventNames.js";

export const handlerRegistry = new Map<
  EventType,
  EventHandler
>([
  [EVENT_NAMES.CPU_HIGH, new CpuHandler()],
  [EVENT_NAMES.MEMORY_HIGH, new MemoryHandler()],
  [EVENT_NAMES.DISK_HIGH, new DiskHandler()],
  [EVENT_NAMES.PROCESS_DOWN, new ProcessDownHandler()],
  [EVENT_NAMES.PROCESS_UP, new ProcessUpHandler()],
]);