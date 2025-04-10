import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // TODO: Add resetDatabase function after 
  
});

afterAll(async () => {
  // Clean up the database after tests
  await prisma.$disconnect();
});

it('should create a new workout plan with related data included', async () => {
  
  // insert workout_plan with nested 'workout', 'workout_set', 'movement'
  expect(1).toBe(1)
});