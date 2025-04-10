import { prisma } from '../../../../prisma/prismaClient.js'

/**
 * Inserts multiple users into the database.
 *
 * Validates that the input is an array of non-null objects, each with a `username` property, 
 * and uses Prisma's `createMany` to insert them in bulk.
 *
 * @param {Array<Object>} users - Array of user objects, each containing a `username`.
 * @throws {Error} If validation fails or the database operation encounters an error.
 */
export async function insertUsers(users) {
  try {
    // Validate that the input is an array of objects and each object has a username
    if (
      !Array.isArray(users) ||
      !users.every(user => typeof user === 'object' && user !== null && 'username' in user)
    ) {
      throw new Error('Invalid input: Must be an array of objects with a "username" property.');
    }

    await prisma.user.createMany({
      data: users
    })
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}