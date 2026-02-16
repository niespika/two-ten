import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultExercises = [
  'Seated row',
  'Chest press',
  'Pull down',
  'Calf raises',
  'Hamstrings',
  'Overhead press',
  'Leg press',
];

async function main() {
  const email = process.env.SEED_EMAIL ?? 'demo@example.com';
  const password = process.env.SEED_PASSWORD ?? 'demo1234';
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  for (const name of defaultExercises) {
    await prisma.exercise.upsert({
      where: { userId_name: { userId: user.id, name } },
      update: {},
      create: { userId: user.id, name, incrementLb: 5 },
    });
  }

  // eslint-disable-next-line no-console
  console.log(`Seed complete. Login: ${email} / ${password}`);
}

main()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
