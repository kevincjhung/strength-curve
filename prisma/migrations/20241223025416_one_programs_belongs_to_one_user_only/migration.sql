/*
  Warnings:

  - You are about to drop the `UserWorkoutPlan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserWorkoutPlan" DROP CONSTRAINT "UserWorkoutPlan_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserWorkoutPlan" DROP CONSTRAINT "UserWorkoutPlan_workout_plan_id_fkey";

-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserWorkoutPlan";

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
