import { prisma } from '@/prisma/client';

/**
 * Creates a new user and associated auth_provider for email/password login.
 * @param email - The user's email address
 * @param hashedPassword - The user's hashed password
 * @param firstName - The user's first name
 * @param lastName - The user's last name
 * @param role - The user's role, either 'user' or 'admin'. Defaults to 'user'.
 * @returns The created user object
 */
export async function createUserWithEmail({
  email,
  hashedPassword,
  firstName,
  lastName,
  role = 'user',
}: {
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  role?: 'user' | 'admin';
}) {
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

/**
 * Checks if a user with the specified email exists in the users table.
 * @param email - The email address to check.
 * @returns Promise<boolean> - True if user exists, false otherwise.
 */
export async function userExistsByEmail(email: string): Promise<boolean> {
  const user = await prisma.users.findUnique({
    where: { email },
    select: { id: true },
  });
  return !!user;
}
