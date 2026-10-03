-- CreateEnum
CREATE TYPE "FlashInfoType" AS ENUM ('INTERNE', 'EXTERNE');

-- AlterTable
ALTER TABLE "FlashInfo" ADD COLUMN     "type" "FlashInfoType" NOT NULL DEFAULT 'INTERNE';
