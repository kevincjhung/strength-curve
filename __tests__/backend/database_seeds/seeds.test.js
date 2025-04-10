import { PrismaClient } from '@prisma/client';
import { resetAppDataTables } from '@/app/utils/database/queries'
import { seedMovements } from '@/app/utils/database/seeds';
import { getMovements } from '@/app/utils/database/queries';

const prisma = new PrismaClient();

beforeAll(async () => {
  await resetAppDataTables();
});

afterAll(async () => {
  try {
    await resetAppDataTables();
  } finally {
    await prisma.$disconnect();
  }
});


it('should return the correct amount of movements from database', async () => {
  await seedMovements();
  const res = await getMovements();
  
  expect(res.length).toBe(84);
});

