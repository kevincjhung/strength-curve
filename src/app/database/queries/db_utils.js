import { prisma } from '../../../../prisma/prismaClient.js';

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




