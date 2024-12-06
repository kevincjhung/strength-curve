/*
  Warnings:

  - You are about to drop the `ExerciseName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExerciseName";

-- CreateTable
CREATE TABLE "ExercisePerformance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "estimatedOneRepMaxInLbs" INTEGER NOT NULL,

    CONSTRAINT "ExercisePerformance_pkey" PRIMARY KEY ("id")
);
