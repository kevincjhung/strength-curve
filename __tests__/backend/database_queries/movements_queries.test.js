import { PrismaClient } from '@prisma/client';
import { resetAppDataTables } from '@/app/database/queries/db_utils'
import { insertMovements, getMovements } from '@/app/database/queries/movements_queries'


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


it('should insert movements correctly', async () => {
  const data = [
    { name: 'arnold press' },
    { name: 'assisted dip' },
    { name: 'back squat' }
  ];

  await insertMovements(data);
  const movements = await getMovements();

  // Check count
  expect(movements.length).toBe(3);

  // Sort both arrays by name to ensure consistent order before comparing
  const sortedInput = [...data].sort((a, b) => a.name.localeCompare(b.name));
  const sortedOutput = [...movements].sort((a, b) => a.name.localeCompare(b.name));

  // Check that each inserted name matches the returned name
  sortedInput.forEach((movement, index) => {
    expect(sortedOutput[index].name).toBe(movement.name);
  });
});