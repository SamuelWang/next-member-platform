import { createUserWithEmail, userExistsByEmail } from '@/dataAccess/auth';
import { LogCategory } from '@/models/logging';
import { UserDTO } from '@/models/user.dto';
import { logEventWithMetadata } from '@/services/auth/logService';
import { hashPassword } from '@/services/auth/passwordService';

/**
 * Service to handle user registration and existence checks.
 * @module services/auth/userService
 */
export async function registerUser({
  email,
  password,
  firstName,
  lastName,
  role = 'user',
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'user' | 'admin';
}): Promise<UserDTO> {
  await logEventWithMetadata({
    level: 'info',
    category: LogCategory.AUTH,
    message: 'User registration attempt',
    metadata: { email, firstName, lastName, role },
  });
  try {
    const hashedPassword = await hashPassword(password);
    const user = await createUserWithEmail({ email, hashedPassword, firstName, lastName, role });
    await logEventWithMetadata({
      userId: user.id,
      level: 'info',
      category: LogCategory.AUTH,
      message: 'User registration successful',
      metadata: { email, firstName, lastName, role },
    });
    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
    };
  } catch (error) {
    await logEventWithMetadata({
      level: 'error',
      category: LogCategory.AUTH,
      message: 'User registration failed',
      metadata: { email, firstName, lastName, role, error: (error as Error).message },
    });
    throw error;
  }
}

/**
 * Checks if a user with the specified email exists.
 * @param email - The email address to check.
 * @returns Promise<boolean> - True if user exists, false otherwise.
 */
export async function checkUserExistsByEmail(email: string): Promise<boolean> {
  return userExistsByEmail(email);
}
