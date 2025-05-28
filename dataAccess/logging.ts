import { prisma } from '@/prisma/client';
import { AppLogInput } from '@/dataAccess/models/logging';

/**
 * Logs an application event to the app_logs table.
 * @param log - The log entry to create
 * @returns The created log record
 */
export async function logAppEvent({ userId, level, category, message, metadata }: AppLogInput) {
  return prisma.app_logs.create({
    data: {
      user_id: userId,
      level,
      category,
      message,
      metadata,
    },
  });
}
