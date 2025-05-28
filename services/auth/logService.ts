import { logAppEvent } from '@/dataAccess/logging';
import { LogLevel } from '@/dataAccess/models/logging';
import { LogCategory } from '@/models/logging';

/**
 * Service to log application events with metadata serialization.
 * @param userId - The ID of the user associated with the log (optional).
 * @param level - The log level (e.g., 'info', 'error').
 * @param category - The category of the log.
 * @param message - The log message.
 * @param metadata - The metadata object to serialize.
 * @returns The created log record.
 */
export async function logEventWithMetadata({
  userId,
  level,
  category,
  message,
  metadata,
}: {
  userId?: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  metadata?: Record<string, unknown>;
}) {
  const serializedMetadata = metadata ? JSON.stringify(metadata) : undefined;
  return logAppEvent({
    userId,
    level,
    category,
    message,
    metadata: serializedMetadata,
  });
}
