import { PrismaClient } from '@prisma/client';
import { resetAppDataTables } from '@/app/database/queries/db_utils'
import { getMovements } from '@/app/database/queries/movements_queries'
import { seedMovements } from '@/app/database/seeds.js'


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

