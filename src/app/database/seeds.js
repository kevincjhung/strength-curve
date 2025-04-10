// Library Imports
import { prisma } from '../../../prisma/prismaClient.js';
import { insertUsers } from './queries/users_queries.js';

// Static Mock Data Imports 
import { movementSeedData } from '../../../mockData/movementData.js'
import { userSeedData } from '../../../mockData/userData.js';
import { upper_lower_4_day } from '../../../mockData/workoutPlanData.js';



/**
 * Inserts predefined user data into the database using Prisma's `createMany` method.
 *
 * @async
 * @function seedUsers
 * @returns {Promise<void>} Resolves when user data is successfully seeded.
 * @throws {Error} Logs an error if the seeding process fails.
 */
export async function seedUsers() {
  try {
    insertUsers(userSeedData);
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
export async function seedMovements() {
  try {
    await Promise.all(movementSeedData.map((movement) => {
      return prisma.movement.create({
        data: {
          name: movement,
        },
      });
    }));
  } catch (error) {
    console.error('Error seeding movements:', error);
  }
}
// TODO: Refactor prisma code to queries.js


// Utility function to fetch movements and create a map of names to IDs
async function getMovementIdMap() {
  const movements = await prisma.movement.findMany();
  return new Map(movements.map(movement => [movement.name.toLowerCase(), movement.id]));
}


/**
 * Seeds database with static preset workout plan. 
 * 
 * 
 * @returns 
*/
export async function seedWorkoutPlans() {
  try {
    const userId = 2; // Dynamic Id to be implemented after MVP
    
    // Fetch movement ID map
    const movementIdMap = await getMovementIdMap();
    
    const newWorkoutPlan = await prisma.workoutPlan.create({
      data: {
        name: "Upper Lower 4 Day",
        description: "A general all-encompassing upper/lower split strength/hypertrophy program focusing on the major lifts",
        userId: userId || 2, // Default userId fallback
        workouts: {
          create: upper_lower_4_day.map(workout => ({
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
// TODO: To be refactored into queries.js file AFTER MVP. As there is currently no feature to add workout_plan from UI