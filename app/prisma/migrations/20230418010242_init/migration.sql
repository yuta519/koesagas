-- CreateTable
CREATE TABLE "Podcast" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "indexName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);
