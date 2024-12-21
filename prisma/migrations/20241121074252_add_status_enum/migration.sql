/*
  Warnings:

  - The `status` column on the `FormData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('new', 'processed', 'in_progress');

-- AlterTable
ALTER TABLE "FormData" DROP COLUMN "status",
ADD COLUMN     "status" "FormStatus" NOT NULL DEFAULT 'new';
