/*
  Warnings:

  - You are about to drop the column `applePodcastyUrl` on the `Episode` table. All the data in the column will be lost.
  - Added the required column `applePodcastUrl` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "applePodcastyUrl",
ADD COLUMN     "applePodcastUrl" TEXT NOT NULL;
