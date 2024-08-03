/*
  Warnings:

  - The `phones` column on the `Barbershop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Barbershop" DROP COLUMN "phones",
ADD COLUMN     "phones" TEXT[];
