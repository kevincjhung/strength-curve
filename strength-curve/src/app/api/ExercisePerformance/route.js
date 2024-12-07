import { prisma } from '../../../../prisma/prismaClient'; // Make sure this is correct based on your project structure


export async function GET() {
  try {
    const exercisePerformances = await prisma.$queryRaw`
      SELECT * 
      FROM "ExercisePerformance";
    `;

    return new Response(JSON.stringify({ data: exercisePerformances }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching ExercisePerformance:', error);

    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}