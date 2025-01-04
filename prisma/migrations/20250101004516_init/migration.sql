-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "workout_plans" (
    "workout_plan_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "workout_plans_pkey" PRIMARY KEY ("workout_plan_id")
);

-- CreateTable
CREATE TABLE "workouts" (
    "workout_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "workout_plan_id" INTEGER,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("workout_id")
);

-- CreateTable
CREATE TABLE "workout_instances" (
    "workout_instance_id" SERIAL NOT NULL,
    "workout_id" INTEGER,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_instances_pkey" PRIMARY KEY ("workout_instance_id")
);

-- CreateTable
CREATE TABLE "workout_sets" (
    "workout_set_id" SERIAL NOT NULL,
    "workout_id" INTEGER,
    "movement_id" INTEGER,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "load_lbs" INTEGER,
    "rest_minutes" INTEGER,

    CONSTRAINT "workout_sets_pkey" PRIMARY KEY ("workout_set_id")
);

-- CreateTable
CREATE TABLE "movements" (
    "movement_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" TEXT,

    CONSTRAINT "movements_pkey" PRIMARY KEY ("movement_id")
);

-- CreateTable
CREATE TABLE "estimated_one_rms" (
    "estimate_id" SERIAL NOT NULL,
    "movement_id" INTEGER,
    "estimate_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimated_onerm_lbs" INTEGER NOT NULL,
    "method" TEXT,

    CONSTRAINT "estimated_one_rms_pkey" PRIMARY KEY ("estimate_id")
);

-- CreateTable
CREATE TABLE "exercise_progress_logs" (
    "log_id" SERIAL NOT NULL,
    "movement_id" INTEGER,
    "log_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "measured_onerm_lbs" INTEGER,
    "user_deload_flag" BOOLEAN NOT NULL DEFAULT false,
    "periodic_deload_flag" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "exercise_progress_logs_pkey" PRIMARY KEY ("log_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "estimated_one_rms_movement_id_key" ON "estimated_one_rms"("movement_id");

-- AddForeignKey
ALTER TABLE "workout_plans" ADD CONSTRAINT "workout_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_workout_plan_id_fkey" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("workout_plan_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_instances" ADD CONSTRAINT "workout_instances_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("workout_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("workout_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "movements"("movement_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimated_one_rms" ADD CONSTRAINT "estimated_one_rms_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "movements"("movement_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_progress_logs" ADD CONSTRAINT "exercise_progress_logs_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "movements"("movement_id") ON DELETE SET NULL ON UPDATE CASCADE;
