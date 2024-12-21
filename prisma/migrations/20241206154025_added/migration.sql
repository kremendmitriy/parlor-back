-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "customerEmail" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'booked';

-- CreateTable
CREATE TABLE "DayOff" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DayOff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unavailable" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unavailable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DayOff" ADD CONSTRAINT "DayOff_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unavailable" ADD CONSTRAINT "Unavailable_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
