export interface CpuHighPayload {
  usage: number;
}

export interface CpuHighPayloadV2
  extends CpuHighPayload {
  processName?: string;
  core?: number;
}

export interface MemoryHighPayload {
  usage: number;
}

export interface DiskHighPayload {
  usage: number;
}

export interface ProcessDownPayload {
  processName: string;
}

export interface ProcessUpPayload {
  processName: string;
}