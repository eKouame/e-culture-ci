-- CreateTable
CREATE TABLE "FlashInfo" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "lien" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlashInfo_pkey" PRIMARY KEY ("id")
);
