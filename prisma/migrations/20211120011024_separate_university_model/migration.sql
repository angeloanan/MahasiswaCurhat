/*
  Warnings:

  - You are about to drop the column `university` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "university",
ADD COLUMN     "universityName" TEXT;

-- CreateTable
CREATE TABLE "University" (
    "name" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_universityName_fkey" FOREIGN KEY ("universityName") REFERENCES "University"("name") ON DELETE SET NULL ON UPDATE CASCADE;
