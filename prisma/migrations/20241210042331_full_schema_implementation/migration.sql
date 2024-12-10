/*
  Warnings:

  - You are about to drop the `ExercisePerformance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExercisePerformance";

-- CreateTable
CREATE TABLE "workout_plans" (
    "workout_plan_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "workout_plans_pkey" PRIMARY KEY ("workout_plan_id")
);

-- CreateTable
CREATE TABLE "workouts" (
    "workout_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "workout_plan_id" INTEGER NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("workout_id")
);

-- CreateTable
CREATE TABLE "workout_instances" (
    "workout_instance_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "workout_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_instances_pkey" PRIMARY KEY ("workout_instance_id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "exercise_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "load_lbs" INTEGER,
    "sets" INTEGER,
    "reps" INTEGER,
    "rpe" INTEGER,
    "rest_minutes" INTEGER,
    "workout_instance_id" INTEGER NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("exercise_id")
);

-- CreateTable
CREATE TABLE "exercise_progress_logs" (
    "log_id" SERIAL NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "log_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "measured_onerm_lbs" INTEGER,
    "user_deload_flag" BOOLEAN NOT NULL DEFAULT false,
    "periodic_deload_flag" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "exercise_progress_logs_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "estimated_onerms" (
    "estimate_id" SERIAL NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "estimate_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimated_onerm_lbs" INTEGER NOT NULL,
    "method" TEXT,

    CONSTRAINT "estimated_onerms_pkey" PRIMARY KEY ("estimate_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_workout_plans" (
    "user_workout_plan_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "workout_plan_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_workout_plans_pkey" PRIMARY KEY ("user_workout_plan_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estimated_onerms_exercise_id_key" ON "estimated_onerms"("exercise_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_workout_plan_id_fkey" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("workout_plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_instances" ADD CONSTRAINT "workout_instances_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("workout_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workout_instance_id_fkey" FOREIGN KEY ("workout_instance_id") REFERENCES "workout_instances"("workout_instance_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_progress_logs" ADD CONSTRAINT "exercise_progress_logs_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("exercise_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimated_onerms" ADD CONSTRAINT "estimated_onerms_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("exercise_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workout_plans" ADD CONSTRAINT "user_workout_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workout_plans" ADD CONSTRAINT "user_workout_plans_workout_plan_id_fkey" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("workout_plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;
