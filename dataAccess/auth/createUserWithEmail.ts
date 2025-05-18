import { prisma } from '@/prisma/client';
import { hashPassword } from '@/services/auth/password';

/**
 * Creates a new user and associated auth_provider for email/password login.
 * @param email - The user's email address
 * @param password - The user's plain text password
 * @param firstName - The user's first name
 * @param lastName - The user's last name
 * @param role - The user's role, either 'user' or 'admin'. Defaults to 'user'.
 * @returns The created user object
 */
export async function createUserWithEmail({
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
}) {
  const hashedPassword = await hashPassword(password);
  return prisma.$transaction(async (tx) => {
    const user = await tx.users.create({
      data: {
        email,
        first_name: firstName,
        last_name: lastName,
        role,
      },
    });
    await tx.auth_providers.create({
      data: {
        user_id: user.id,
        provider: 'email',
        email,
        password_hash: hashedPassword,
        is_email_verified: false,
      },
    });
    return user;
  });
}
