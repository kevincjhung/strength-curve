import { PrismaClient } from '@prisma/client';
import { resetAppDataTables } from '@/app/database/queries/db_utils'
import { insertUsers } from '@/app/database/queries/users_queries.js'
import { seedUsers } from '@/app/database/seeds'

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


it('should return correct number of users from the database', async () => {
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


it('should correctly add a new user', async () => {
  await insertUsers([{ username: 'dave', email: 'dave@email.com' }]);
  const users = await prisma.user.findMany();

  expect(users).toHaveLength(4);
  expect(users).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ username: "alice", "email": "alice@email.com"  }),
      expect.objectContaining({ username: "bob", email: "bob@email.com" }),
      expect.objectContaining({ username: 'charlie', email: 'charlie@email.com' }),
      expect.objectContaining({ username: 'dave', email: 'dave@email.com' })
    ])
  );
})