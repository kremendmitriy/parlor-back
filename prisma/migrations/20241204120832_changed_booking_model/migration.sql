/*
  Warnings:

  - You are about to drop the column `customerId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `customerEmail` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('booked', 'pending', 'cancelled');

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "customerId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "BookingStatus" NOT NULL;
