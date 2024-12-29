import { prisma } from '../../../../prisma/prismaClient';

import { NextResponse } from 'next/server';


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

export async function POST(req) {
  // extract all of the movements, trim leading ending whitespace and lowercase. enter into db if it doesn't already exist

  // then when you insert the plan, you have the correct movement id

  try {
    const newWorkoutPlan = await prisma.workoutPlan.create({
      data: {
        name: "",
        description: "A general 4 day upper lower split workout plan focused on compound movements",
        userId: 2,
        workouts: {
          create: [
            {
              name: "upper day 1",
              sets: {
                create: [
                  {
                    sets: 1,
                    reps: 2,
                    loadLbs: 3,
                    restMinutes: 4
                  },
                  {
                    sets: 2,
                    reps: 3,
                    loadLbs: 4,
                    restMinutes: 5
                  }
                ]
              }
            }
          ]
        }
      }
    });

    


    // Return the newly created workoutPlan
    return NextResponse.json({ workoutPlan: newWorkoutPlan }, { status: 201 });

  } catch (error) {
    // Log detailed error for debugging
    console.error(error.message);

    // Check if the error is valid before returning the response
    const errorResponse = {
      error: 'Failed to create workout plan',
      details: error?.message || 'No additional error details available',
    };

    // Return the error response as JSON
    return NextResponse.json(errorResponse, { status: 500 });
  }
}