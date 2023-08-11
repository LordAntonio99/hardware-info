export interface ICPU {
  manufacturer: string;
  brand: string;
  vendor: string;
  family: string;
  model: string;
  stepping: string;
  revision: string;
  voltage: string;
  speed: number;
  speedMin: number;
  speedMax: number;
  governor: string;
  cores: number;
  physicalCores: number;
  performanceCores: number;
  efficiencyCores: number;
  processors: number;
  socket: string;
  flags: string;
  virtualization: boolean;
}
