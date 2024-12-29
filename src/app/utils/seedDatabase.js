import { prisma } from '../../../prisma/prismaClient.js';
import { movements } from './exerciseNames.js'


// Resets the app's data tables by truncating all data and resetting identities.
async function resetAppDataTables() {
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

      console.log(`Table '${table}' truncated and identity reset.`);
    }

    // Truncate specific critical tables in one go for performance efficiency.
    await prisma.$queryRaw`
      TRUNCATE TABLE 
        users, workout_plans, workouts, workout_instances, 
        workout_sets, movements, estimated_one_rms, exercise_progress_logs 
      RESTART IDENTITY;`;

    console.log('App data tables reset successfully.\n');
  } catch (error) {
    console.error('Error resetting app data tables:', error);
  }
}

// Seeds the application with a set of initial user data.
async function seedUsers() {
  try {
    await prisma.user.createMany({
      data: [
        { username: 'toussaintlouverture', email: 'toussaint.louverture@gmail.com' },
        { username: 'emilianozapata', email: 'emiliano.zapata@gmail.com' },
        { username: 'simonbolivar', email: 'simon.bolivar@gmail.com' },
      ],
    });

    console.log('Users seeded successfully.\n');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

// Seeds the movements data into the database.
async function seedMovements() {
  try {
    await Promise.all(movements.map(movement => {
      return prisma.movement.create({
        data: {
          name: movement,
        },
      });
    }));

    console.log('Movements seeded successfully.\n');
  } catch (error) {
    console.error('Error seeding movements:', error);
  }
}


async function seedApp() {
  await resetAppDataTables();
  await seedUsers();         
  await seedMovements();     
}


seedApp();