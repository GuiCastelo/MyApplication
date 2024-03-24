import { FloaterNotificationSeverity } from "../types";

export interface FloaterNotificationInterface {
  severity: FloaterNotificationSeverity;
  message: string;
  show: boolean;
  timeout: number;
}