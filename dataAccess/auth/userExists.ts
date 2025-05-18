import { prisma } from '@/prisma/client'

/**
 * Checks if a user with the specified email exists in the users table.
 * @param email - The email address to check.
 * @returns Promise<boolean> - True if user exists, false otherwise.
 */
export async function userExistsByEmail(email: string): Promise<boolean> {
  const user = await prisma.users.findUnique({
    where: { email },
    select: { id: true },
  })
  return !!user
}
