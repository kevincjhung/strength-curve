import { prisma } from '../../../../prisma/prismaClient.js';
import { movementSeedData } from '../../../../data/movementData.js';

/**
 * Resets all application data tables in the public schema by truncating them,
 * resetting primary key sequences, and maintaining referential integrity.
 *
 * This operation:
 * - Excludes system tables.
 * - Uses Prisma raw queries for flexibility.
 * - Deletes all data irreversibly; intended for development or testing only.
 *
 * @throws {Error} Logs any errors during the reset process.
 */
export async function resetAppDataTables() {
  try {
    // Query to get a list of all user-defined tables from the public schema,excluding system tables 
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name NOT LIKE 'pg_%' 
      AND table_name NOT LIKE 'information_schema%'`;

    // Iterate through each table name and truncate it to reset the data.
    for (const { table_name: table } of tables) {
      const query = `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`;

      // Execute the raw query to truncate the table
      await prisma.$executeRawUnsafe(query);
    }

    // Truncate specific critical tables in one go for performance efficiency.
    await prisma.$queryRaw`
      TRUNCATE TABLE 
        users, workout_plans, workouts, workout_instances, 
        workout_sets, movements, estimated_one_rms, exercise_progress_logs 
      RESTART IDENTITY;`;
  } catch (error) {
    console.error('Error resetting app data tables:', error);
  }
}


/**
 * Inserts multiple users into the database.
 *
 * Validates that the input is an array of non-null objects, each with a `username` property, 
 * and uses Prisma's `createMany` to insert them in bulk.
 *
 * @param {Array<Object>} users - Array of user objects, each containing a `username`.
 * @throws {Error} If validation fails or the database operation encounters an error.
 */
export async function insertUsers(users) {
  try {
    // Validate that the input is an array of objects and each object has a username
    if (
      !Array.isArray(users) ||
      !users.every(user => typeof user === 'object' && user !== null && 'username' in user)
    ) {
      throw new Error('Invalid input: Must be an array of objects with a "username" property.');
    }

    await prisma.user.createMany({
      data: users
    })
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}


/**
 * Inserts a list of movements into the database.
 *
 * @param {Array<{ name: string, id: number }>} movements - Array of movement objects to insert.
 * @throws {Error} If the database operation fails.
 */
export async function insertMovements (movementData){
 try {
    await Promise.all(movementData.map(movement => {
      return prisma.movement.create({
        data: movement,
      });
    }));
  } catch (error) {
    console.error('Error inserting movementSeedData:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}

/**
 * Returns a list of movements from the database.
 * @returns Array of movements in ascending order by name
 */
export async function getMovements() {
  const movements = await prisma.movement.findMany({
    orderBy: { name: 'asc' },
  });

  return movements;
}