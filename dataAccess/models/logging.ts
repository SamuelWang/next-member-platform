import { LogCategory } from '@/models/logging';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface AppLogInput {
  userId?: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  metadata?: string;
}
