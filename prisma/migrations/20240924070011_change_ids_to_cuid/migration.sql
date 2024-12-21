-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "firstName" VARCHAR(32) NOT NULL,
    "lastName" VARCHAR(32) NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "profileImageUrl" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(32) NOT NULL,
    "lastName" VARCHAR(32) NOT NULL,
    "description" VARCHAR(512) NOT NULL,
    "artistImageUrl" VARCHAR(255),

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistWork" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "workUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "ArtistWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "comment" VARCHAR(1024),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_review_artist" ON "Review"("artistId");

-- CreateIndex
CREATE INDEX "idx_review_user" ON "Review"("userId");

-- AddForeignKey
ALTER TABLE "ArtistWork" ADD CONSTRAINT "ArtistWork_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
