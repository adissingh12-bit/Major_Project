
export interface SensorData {
  id: string;
  room: string;
  presence: boolean;
  status: 'ONLINE' | 'COMM_HANG' | 'SIGNAL_LOSS' | 'SECURE';
  distance?: number;
  speed?: number;
  breathingRate?: number;
  heartRate?: number;
  temp?: number;
  humidity?: number;
  voltage?: number;
  current?: number;
  rfStatus?: 'clear' | 'interference' | 'active';
  systemHealth: number;
  timestamp: string;
}

export interface ChartData {
  time: string;
  [key: string]: string | number;
}
