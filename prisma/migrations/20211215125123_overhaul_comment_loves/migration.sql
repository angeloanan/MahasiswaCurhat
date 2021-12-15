/*
  Warnings:

  - The `attachment` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_downvote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_upvote` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `postId` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "_downvote" DROP CONSTRAINT "_downvote_A_fkey";

-- DropForeignKey
ALTER TABLE "_downvote" DROP CONSTRAINT "_downvote_B_fkey";

-- DropForeignKey
ALTER TABLE "_upvote" DROP CONSTRAINT "_upvote_A_fkey";

-- DropForeignKey
ALTER TABLE "_upvote" DROP CONSTRAINT "_upvote_B_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "attachment",
ADD COLUMN     "attachment" BYTEA;

-- DropTable
DROP TABLE "_downvote";

-- DropTable
DROP TABLE "_upvote";

-- CreateTable
CREATE TABLE "_userUpvote" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_userDownvote" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_commentLoves" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userUpvote_AB_unique" ON "_userUpvote"("A", "B");

-- CreateIndex
CREATE INDEX "_userUpvote_B_index" ON "_userUpvote"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_userDownvote_AB_unique" ON "_userDownvote"("A", "B");

-- CreateIndex
CREATE INDEX "_userDownvote_B_index" ON "_userDownvote"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_commentLoves_AB_unique" ON "_commentLoves"("A", "B");

-- CreateIndex
CREATE INDEX "_commentLoves_B_index" ON "_commentLoves"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userUpvote" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userUpvote" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userDownvote" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userDownvote" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentLoves" ADD FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentLoves" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
