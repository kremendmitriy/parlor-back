/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER';

-- CreateTable
CREATE TABLE "TattooImage" (
    "id" SERIAL NOT NULL,
    "style" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,

    CONSTRAINT "TattooImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormData_pkey" PRIMARY KEY ("id")
);
