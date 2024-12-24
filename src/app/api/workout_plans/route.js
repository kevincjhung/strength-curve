import { prisma } from '../../../../prisma/prismaClient'; 

import { NextResponse } from 'next/server';
 

// /api/workout_plans
export async function GET(req) {
  try {
     const workout_plans = await prisma.$queryRaw`SELECT * FROM workout_plans`;

    // Return the workout_plans as a JSON response using NextResponse
    return NextResponse.json(workout_plans);
  } catch (error) {
    // Handle any errors and respond with a 500 status code using NextResponse
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch workout_plans' }, { status: 500 });
  }
}

// Named export for handling other HTTP methods (e.g., POST, PUT, DELETE)
export async function POST(req) {

  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT(req) {
  
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE(req) {
  
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
