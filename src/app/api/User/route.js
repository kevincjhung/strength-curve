import { prisma } from '../../../../prisma/prismaClient'; 

import { NextResponse } from 'next/server';


export async function GET(req) {
  try {
    // Fetch all users from the User table
    const users = await prisma.user.findMany();

    // Return the users as a JSON response using NextResponse
    return NextResponse.json(users);
  } catch (error) {
    // Handle any errors and respond with a 500 status code using NextResponse
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
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
