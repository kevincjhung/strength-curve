import { PrismaClient } from '@prisma/client';
import { resetAppDataTables } from '@/app/utils/database/queries'

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


it('should', async () => {
  expect(1).toBe(1);
});
