import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // TODO: Replace with seed functions and resetDatabase functions from 'utils/*' directory
  
  await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`;
  await prisma.user.createMany({
    data: [
      { username: 'toussaintlouverture', email: 'toussaint.louverture@gmail.com' },
      { username: 'emilianozapata', email: 'emiliano.zapata@gmail.com' },
      { username: 'simonbolivar', email: 'simon.bolivar@gmail.com' },
    ],
  });
});

afterAll(async () => {
  // Clean up the database after tests
  await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`;
  await prisma.$disconnect();
});

it('should return three users from the database', async () => {
  const users = await prisma.user.findMany();
  expect(users).toHaveLength(3);

  expect(users).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ username: 'toussaintlouverture', email: 'toussaint.louverture@gmail.com' }),
      expect.objectContaining({ username: 'emilianozapata', email: 'emiliano.zapata@gmail.com' }),
      expect.objectContaining({ username: 'simonbolivar', email: 'simon.bolivar@gmail.com' }),
    ])
  );
});