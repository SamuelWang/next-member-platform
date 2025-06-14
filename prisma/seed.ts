import { prisma } from './client.ts';
import { registerUser, checkUserExistsByEmail } from '@/services/auth/userService';

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const exists = await checkUserExistsByEmail(adminEmail);
    if (!exists) {
      console.log('Registering new admin user...');
      await registerUser({
        email: adminEmail,
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      });
      console.log('Admin user registered.');
    } else {
      console.log('Admin user already exists.');
    }
  } else {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD environment variable is not set.');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
