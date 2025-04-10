import { prisma } from '../../../../prisma/prismaClient.js'

/**
 * Inserts a list of movements into the database.
 *
 * @param {Array<{ name: string, id: number }>} movements - Array of movement objects to insert.
 * @throws {Error} If the database operation fails.
 */
export async function insertMovements (movementData){
  try {
     await Promise.all(movementData.map(movement => {
       return prisma.movement.create({
         data: movement,
       });
     }));
   } catch (error) {
     console.error('Error inserting movementSeedData:', error);
     throw error; // Re-throw the error for the caller to handle
   }
 }
 
 /**
  * Returns a list of movements from the database.
  * @returns Array of movements in ascending order by name
  */
 export async function getMovements() {
   const movements = await prisma.movement.findMany({
     orderBy: { name: 'asc' },
   });
 
   return movements;
 }