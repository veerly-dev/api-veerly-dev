export interface HealthStatus {
  id: string;
  name: string;
  severityLevel?: number; // e.g. 1 = mild, 5 = critical
  notes?: string;
}
