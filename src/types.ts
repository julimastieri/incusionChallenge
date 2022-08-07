export interface HealthStatus {
    name: string;
    success: boolean;
    message: string;
    hostname?: string;
    time?: number;
  }