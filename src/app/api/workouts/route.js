import { prisma } from '../../../../prisma/prismaClient'; 

import { NextResponse } from 'next/server';
 

/* GET /api/workouts */
export async function GET(req) {
  try {
    // Fetch all workouts from the database
    const workouts = await prisma.workout.findMany({
      include: {
        workoutPlan: true, // You can include related models if necessary
      },
    });

    // Return the list of workouts as a JSON response
    return NextResponse.json(workouts);
  } catch (error) {
    // Handle any errors and respond with a 500 status code using NextResponse
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 });
  }
}

/* POST /api/workouts */
export async function POST(req) {
  try {
    const { name, workoutPlanId } = await req.json(); // Assuming request body contains `name` and `workoutPlanId`


    // Check if the required fields are provided
    if (!name || !workoutPlanId) {
      return NextResponse.json({ error: 'Name and workoutPlanId are required' }, { status: 400 });
    }

    // Create a new workout in the database
    const newWorkout = await prisma.workout.create({
      data: {
        name,
        workoutPlanId,  // Link to the existing workout plan by its ID
      },
    });

    // Return the newly created workout as a JSON response
    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    // Handle any errors and respond with a 500 status code using NextResponse
    console.error(error);
    return NextResponse.json({ error: 'Failed to create workout' }, { status: 500 });
  }
}


export async function PUT(req) {
  
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

/* DELETE /api/workouts?id=1  */ 
export async function DELETE(req) {
  try {
    // Get the workout ID from the URL params or the request body
    const { searchParams } = new URL(req.url);
    const workoutId = searchParams.get('id'); // Assuming the workout ID is passed as a query parameter

    // Validate if an ID was provided
    if (!workoutId) {
      return NextResponse.json({ error: 'Workout ID is required' }, { status: 400 });
    }

    // Delete the workout by ID
    const deletedWorkout = await prisma.workout.delete({
      where: {
        id: parseInt(workoutId),  // Parse the ID to an integer if it's a string
      },
    });

    // Return a response indicating the workout was deleted
    return NextResponse.json({ message: 'Workout deleted successfully', workout: deletedWorkout });
  } catch (error) {
    // Handle any errors and respond with a 500 status code using NextResponse
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete workout' }, { status: 500 });
  }
}