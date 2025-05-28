export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface AppLogInput {
  userId?: string;
  level: LogLevel;
  category: string;
  message: string;
  metadata?: string;
}
