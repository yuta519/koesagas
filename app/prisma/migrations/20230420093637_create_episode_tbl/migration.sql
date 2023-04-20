-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "backnumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "spotifyUrl" TEXT NOT NULL,
    "applePodcastyUrl" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);
