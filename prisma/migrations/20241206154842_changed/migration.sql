/*
  Warnings:

  - The values [pending,cancelled] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `endDate` on the `DayOff` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `DayOff` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Unavailable` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Unavailable` table. All the data in the column will be lost.
  - You are about to alter the column `reason` on the `Unavailable` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `date` to the `DayOff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Unavailable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('booked', 'dayOff', 'unavailable');
ALTER TABLE "Booking" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TABLE "DayOff" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TABLE "Unavailable" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "BookingStatus_old";
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT 'booked';
COMMIT;

-- AlterTable
ALTER TABLE "DayOff" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'dayOff';

-- AlterTable
ALTER TABLE "Unavailable" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'unavailable',
ALTER COLUMN "reason" SET DATA TYPE VARCHAR(255);
