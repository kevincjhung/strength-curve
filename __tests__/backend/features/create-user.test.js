import { PrismaClient } from '@prisma/client';
import { resetAppDataTables } from '@/app/utils/database/queries'
import { seedUsers } from '@/app/utils/database/seeds'


const prisma = new PrismaClient();

beforeAll(async () => {
  await resetAppDataTables();
  await seedUsers();
});


afterAll(async () => {
  try {
    await resetAppDataTables();
  } finally {
    await prisma.$disconnect();
  }
});

it('should return three users from the database', async () => {
  const users = await prisma.user.findMany();
  expect(users).toHaveLength(3);

  expect(users).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ username: "alice", "email": "alice@email.com"  }),
      expect.objectContaining({ username: "bob", email: "bob@email.com" }),
      expect.objectContaining({ username: 'charlie', email: 'charlie@email.com' }),
    ])
  );
});
