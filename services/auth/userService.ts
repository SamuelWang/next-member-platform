import { createUserWithEmail } from '@/dataAccess/auth/createUserWithEmail';
import { hashPassword } from '@/services/auth/password';
import { UserDTO } from '@/models/user.dto';
import { userExistsByEmail } from '@/dataAccess/auth/userExists';

/**
 * Service for registering a new user with email and password.
 * Handles business logic, validation, and logging if needed.
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
  const hashedPassword = await hashPassword(password);
  const user = await createUserWithEmail({ email, hashedPassword, firstName, lastName, role });
  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role,
  };
}

export async function checkUserExistsByEmail(email: string): Promise<boolean> {
  return userExistsByEmail(email);
}
