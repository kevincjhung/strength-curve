import { prisma } from '../../../../prisma/prismaClient';

import { NextResponse } from 'next/server';
import { seedWorkoutPlans } from '../../utils/seedDatabase.js';


// /api/workout_plans
export async function GET(req) {
  try {
    // Query workout plans from the database
    const workout_plans = await prisma.workoutPlan.findMany({
      include: {
        workouts: {
          include: {
            sets: {
              include: {
                movement: true, // Include movement details for each set
              },
            },
          },
        },
      },
    });

    return NextResponse.json(workout_plans);
  } catch (error) {
    // Handle any errors and respond with a 500 status code using NextResponse
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch workout_plans' }, { status: 500 });
  }
}

// /api/workout_plans
export async function POST(req) {
  try {
    const newWorkoutPlan = await seedWorkoutPlans();
 
     return NextResponse.json(newWorkoutPlan, { status: 201 });
  } catch (error) {
    // Handle any errors and respond with a 500 status code
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create workout plan', details: error.message },
      { status: 500 }
    );
  }
}