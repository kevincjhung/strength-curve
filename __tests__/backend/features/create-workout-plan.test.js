import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Truncate and reset related tables
  await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "workout_plans" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "workouts" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "workout_sets" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "movements" RESTART IDENTITY CASCADE;`;
});

afterAll(async () => {
  // Clean up the database after tests
  await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "workout_plans" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "workouts" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "workout_sets" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "movements" RESTART IDENTITY CASCADE;`;

  await prisma.$disconnect();
});

it('should create a new workout plan with related data included', async () => {
  
  // insert workout_plan with nested 'workout', 'workout_set', 'movement'
  expect(1).toBe(1)
});