-- CreateTable
CREATE TABLE "WorkoutPlan" (
    "workout_plan_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("workout_plan_id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "workout_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "workout_plan_id" INTEGER NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("workout_id")
);

-- CreateTable
CREATE TABLE "WorkoutInstance" (
    "workout_instance_id" SERIAL NOT NULL,
    "workout_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkoutInstance_pkey" PRIMARY KEY ("workout_instance_id")
);

-- CreateTable
CREATE TABLE "WorkoutSet" (
    "workout_set_id" SERIAL NOT NULL,
    "workout_id" INTEGER NOT NULL,
    "movement_id" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "load_lbs" INTEGER,
    "rest_minutes" INTEGER,

    CONSTRAINT "WorkoutSet_pkey" PRIMARY KEY ("workout_set_id")
);

-- CreateTable
CREATE TABLE "Movement" (
    "movement_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" TEXT,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("movement_id")
);

-- CreateTable
CREATE TABLE "EstimatedOneRm" (
    "estimate_id" SERIAL NOT NULL,
    "movement_id" INTEGER NOT NULL,
    "estimate_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimated_onerm_lbs" INTEGER NOT NULL,
    "method" TEXT,

    CONSTRAINT "EstimatedOneRm_pkey" PRIMARY KEY ("estimate_id")
);

-- CreateTable
CREATE TABLE "ExerciseProgressLog" (
    "log_id" SERIAL NOT NULL,
    "movement_id" INTEGER,
    "log_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "measured_onerm_lbs" INTEGER,
    "user_deload_flag" BOOLEAN NOT NULL DEFAULT false,
    "periodic_deload_flag" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "ExerciseProgressLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserWorkoutPlan" (
    "user_workout_plan_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "workout_plan_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWorkoutPlan_pkey" PRIMARY KEY ("user_workout_plan_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EstimatedOneRm_movement_id_key" ON "EstimatedOneRm"("movement_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_workout_plan_id_fkey" FOREIGN KEY ("workout_plan_id") REFERENCES "WorkoutPlan"("workout_plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutInstance" ADD CONSTRAINT "WorkoutInstance_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workout"("workout_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workout"("workout_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "Movement"("movement_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimatedOneRm" ADD CONSTRAINT "EstimatedOneRm_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "Movement"("movement_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseProgressLog" ADD CONSTRAINT "ExerciseProgressLog_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "Movement"("movement_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkoutPlan" ADD CONSTRAINT "UserWorkoutPlan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkoutPlan" ADD CONSTRAINT "UserWorkoutPlan_workout_plan_id_fkey" FOREIGN KEY ("workout_plan_id") REFERENCES "WorkoutPlan"("workout_plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;
