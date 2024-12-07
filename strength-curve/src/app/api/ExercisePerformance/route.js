import { prisma } from '../../../../prisma/prismaClient'; // Make sure this is correct based on your project structure


export async function GET() {
  try {
    const exercisePerformances = await prisma.$queryRaw`
      SELECT * 
      FROM "ExercisePerformance";
    `;


    if (!exercisePerformances) {
      throw new Error('No data found in ExercisePerformance table');
    }

    // Return the data as JSON
    return new Response(JSON.stringify({ data: exercisePerformances }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching ExercisePerformance:', error);

    // Fixing the error response structure by ensuring it's an object
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }), // Ensure it's an object
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}