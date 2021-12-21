/*
  Warnings:

  - You are about to drop the column `userId` on the `CommentReport` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PostReport` table. All the data in the column will be lost.
  - Added the required column `reporterId` to the `CommentReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reporterId` to the `PostReport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "CommentReport" DROP CONSTRAINT "CommentReport_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentReport" DROP CONSTRAINT "CommentReport_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostReport" DROP CONSTRAINT "PostReport_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostReport" DROP CONSTRAINT "PostReport_userId_fkey";

-- AlterTable
ALTER TABLE "CommentReport" DROP COLUMN "userId",
ADD COLUMN     "reporterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostReport" DROP COLUMN "userId",
ADD COLUMN     "reporterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allowEmailNotification" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "CommentNotification" (
    "id" TEXT NOT NULL,
    "recepientId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "CommentNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentNotification" ADD CONSTRAINT "CommentNotification_recepientId_fkey" FOREIGN KEY ("recepientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentNotification" ADD CONSTRAINT "CommentNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReport" ADD CONSTRAINT "PostReport_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReport" ADD CONSTRAINT "PostReport_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReport" ADD CONSTRAINT "CommentReport_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReport" ADD CONSTRAINT "CommentReport_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
