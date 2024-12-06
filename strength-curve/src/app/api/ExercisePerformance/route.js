import { prisma } from '../../../../prisma/prismaClient'; // Make sure this is correct based on your project structure

export async function GET(request) {
  try {
    const exercises = await prisma.exercisePerformance.findMany(); // Correct model name

    return new Response(
      JSON.stringify(exercises), // Return the fetched exercises
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching exercises:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch exercises" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

// TODO: finish the GET route for read all from Table "ExercisePerformance"