-- CreateTable
CREATE TABLE "ExercisePerformance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "estimatedOneRepMaxInLbs" INTEGER NOT NULL,
    "timeOfLastUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExercisePerformance_pkey" PRIMARY KEY ("id")
);
