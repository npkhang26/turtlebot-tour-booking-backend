/*
  Warnings:

  - You are about to drop the column `description` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `notes` table. All the data in the column will be lost.
  - Added the required column `fromStation` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toStation` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notes" DROP COLUMN "description",
DROP COLUMN "title",
DROP COLUMN "url",
ADD COLUMN     "fromStation" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "toStation" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "stations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_fromStation_fkey" FOREIGN KEY ("fromStation") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_toStation_fkey" FOREIGN KEY ("toStation") REFERENCES "stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
