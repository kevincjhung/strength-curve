import { prisma } from '../../../prisma/prismaClient.js';
import { movements } from '../../../data/movementData.js'
import { userSeedData } from '../../../data/userData.js';


/**
 * Resets all application data tables by truncating their contents and resetting identities.
 * 
 * Fetches user-defined tables in the public schema and truncates each, excluding system tables. 
 * Also truncates critical tables collectively for efficiency.
 *
 * @async
 * @function resetAppDataTables
 * @returns {Promise<void>} Resolves on successful reset, logs errors on failure.
 */
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

    console.log('App data tables reset successfully.');
  } catch (error) {
    console.error('Error resetting app data tables:', error);
  }
}

/**
 * Seeds the database with user data.
 * 
 * Inserts predefined user data into the database using Prisma's `createMany` method.
 *
 * @async
 * @function seedUsers
 * @returns {Promise<void>} Resolves when user data is successfully seeded.
 * @throws {Error} Logs an error if the seeding process fails.
 */
async function seedUsers() {
  try {
    console.log(userSeedData)
    await prisma.user.createMany({
      data: userSeedData
    });
    
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

/**
 * Seeds the database with movement data.
 * 
 * Iterates through a predefined list of movements and inserts each into the database, 
 * assigning a unique ID to each entry.
 *
 * @async
 * @function seedMovements
 * @returns {Promise<void>} Resolves when movements are successfully seeded.
 * @throws {Error} Logs an error if the seeding process fails.
 */
async function seedMovements() {
  try {
    await Promise.all(movements.map((movement, i) => {
      return prisma.movement.create({
        data: {
          name: movement,
          id: i + 1
        },
      });
    }));
  } catch (error) {
    console.error('Error seeding movements:', error);
  }
}


// Utility function to fetch movements and create a map of names to IDs
async function getMovementIdMap() {
  const movements = await prisma.movement.findMany();
  return new Map(movements.map(movement => [movement.name.toLowerCase(), movement.id]));
}


// Utility function to validate movements and return missing ones
function findMissingMovements(workoutMovements, movementIdMap) {
  return workoutMovements.filter(
    movement => !movementIdMap.has(movement.name.toLowerCase())
  );
}


export async function seedWorkoutPlans() {
  try {
    // TODO: factor out the pre-set program into separate file
    // TODO: factor out function that inserts workoutMovements. the function will be called by both seedDatabase.js and API route
    const workoutMovements = [
      {
        day: "lower day 1",
        exercises: [
          { name: "back squat", sets: 3, reps: 6, loadLbs: 265, restMinutes: 3.5 },
          { name: "romanian deadlift", sets: 3, reps: 10, loadLbs: 205, restMinutes: 3 },
          { name: "barbell hip thrust", sets: 3, reps: 12, loadLbs: 140, restMinutes: 3 },
          { name: "single leg extension", sets: 3, reps: 12, loadLbs: 80, restMinutes: 1.5 },
          { name: "single lying leg curl", sets: 3, reps: 12, loadLbs: 80, restMinutes: 1.5 },
          { name: "palloff press", sets: 3, reps: 15, loadLbs: 50, restMinutes: 2 },
          { name: "weighted rope crunch", sets: 3, reps: 12, loadLbs: 77.5, restMinutes: 2 },
          { name: "kettlebell wood choppers", sets: 3, reps: 15, loadLbs: 55, restMinutes: 2 }
        ],
      },
      {
        day: "upper day 1",
        exercises: [
          { name: "bench press", sets: 3, reps: 5, loadLbs: 205, restMinutes: 3 },
          { name: "lat pulldown", sets: 3, reps: 10, loadLbs: 205, restMinutes: 2.5 },
          { name: "overhead press", sets: 3, reps: 10, loadLbs: 225, restMinutes: 2.5 },
          { name: "chest supported t-bar row", sets: 3, reps: 12, loadLbs: 205, restMinutes: 2.5 },
          { name: "pec dec", sets: 3, reps: 12, loadLbs: 120, restMinutes: 2 },
          { name: "dumbbell supinated curl", sets: 3, reps: 10, loadLbs: 30, restMinutes: 2 },
          { name: "single arm rope tricep extension", sets: 3, reps: 12, loadLbs: 80, restMinutes: 2 },
          { name: "reverse fly", sets: 3, reps: 12, loadLbs: 30, restMinutes: 2 },
        ],
      },
      {
        day: "lower day 2",
        exercises: [
          { name: "deadlift", sets: 3, reps: 8, loadLbs: 225, restMinutes: 3 },
          { name: "barbell lunge", sets: 3, reps: 10, loadLbs: 165, restMinutes: 2.5 },
          { name: "single leg extension", sets: 3, reps: 15, loadLbs: 70, restMinutes: 1.5 },
          { name: "single lying leg curl", sets: 3, reps: 15, loadLbs: 60, restMinutes: 1.5 },
          { name: "machine seated hip abduction", sets: 3, reps: 15, loadLbs: 45, restMinutes: 1.5 },
          { name: "standing calf raise", sets: 3, reps: 12, loadLbs: 200, restMinutes: 1.5 },
          { name: "standing cable chops", sets: 3, reps: 12, loadLbs: 90, restMinutes: 1.5 },
        ],
      },
      {
        day: "upper day 2",
        exercises: [
          { name: "dumbbell incline press", sets: 3, reps: 8, loadLbs: 87.5, restMinutes: 2.5 },
          { name: "reverse grip lat pulldown", sets: 3, reps: 8, loadLbs: 190, restMinutes: 2.5 },
          { name: "weighted dip", sets: 3, reps: 10, loadLbs: 25, restMinutes: 2.5 },
          { name: "barbell bent over row", sets: 3, reps: 12, loadLbs: 165, restMinutes: 2.5 },
          { name: "lateral raise", sets: 3, reps: 15, loadLbs: 30, restMinutes: 2.5 },
          { name: "face pull", sets: 3, reps: 15, loadLbs: 32.5, restMinutes: 2 },
          { name: "hammer curl", sets: 3, reps: 8, loadLbs: 30, restMinutes: 2 },
        ],
      },
    ];

    // TODO: dymanic userId after auth is implemented
    const userId = 2; // Default userId fallback for standalone script

    // Fetch movement ID map
    const movementIdMap = await getMovementIdMap();

    // TODO: Validate movements and handle missing ones by adding them to db. **AFTER MVP**

    const newWorkoutPlan = await prisma.workoutPlan.create({
      data: {
        name: "JN Upper Lower 4 Day Version 1",
        description: "A general all-encompassing upper/lower split strength/hypertrophy program focusing on the major lifts",
        userId: userId || 2, // Default userId fallback
        workouts: {
          create: workoutMovements.map(workout => ({
            name: workout.day,
            sets: {
              create: workout.exercises.map(exercise => ({
                movementId: movementIdMap.get(exercise.name.toLowerCase()),
                sets: exercise.sets,
                reps: exercise.reps,
                loadLbs: exercise.loadLbs,
                restMinutes: exercise.restMinutes,
              })),
            },
          })),
        },
      },
    });

    return newWorkoutPlan;
  } catch (error) {
    console.error(error);
  }
}


async function seed(){
  await resetAppDataTables();
  await seedUsers();
  await seedMovements();
}

seed();
