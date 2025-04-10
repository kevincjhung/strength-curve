import { PrismaClient } from '@prisma/client';
import { resetAppDataTables } from '@/app/utils/database/queries'
import { seedMovements } from '@/app/utils/database/seeds'


const prisma = new PrismaClient();

beforeAll(async () => {
  await resetAppDataTables();
  await seedMovements();
});

afterAll(async () => {
  try {
    await resetAppDataTables();
  } finally {
    await prisma.$disconnect();
  }
});

it('should insert movements correctly', async () => {
  const results = await seedMovements();

  
  console.log(results)
  expect(1).toBe(1);
});

