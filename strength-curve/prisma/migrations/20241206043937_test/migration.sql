-- CreateTable
CREATE TABLE "ExerciseName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "estimatedOneRepMaxInLbs" INTEGER NOT NULL,

    CONSTRAINT "ExerciseName_pkey" PRIMARY KEY ("id")
);
