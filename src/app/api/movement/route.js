import { prisma } from '../../../../prisma/prismaClient'; 

import { NextResponse } from 'next/server';


export async function GET(req) {
  try {
    // Fetch all users from the User table
    const movements = await prisma.movement.findMany({
      orderBy: { name: 'asc' },
    });
    // Return the users as a JSON response using NextResponse
    return NextResponse.json(movements);
  } catch (error) {
    // Handle any errors and respond with a 500 status code using NextResponse
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch movements' }, { status: 500 });
  }
}


export async function POST(req) {
  
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}


export async function PUT(req) {
  
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}


export async function DELETE(req) {
  
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
