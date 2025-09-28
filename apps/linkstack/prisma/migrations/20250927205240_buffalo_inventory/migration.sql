/*
  Warnings:

  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganizationMembership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Organization" DROP CONSTRAINT "Organization_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrganizationMembership" DROP CONSTRAINT "OrganizationMembership_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrganizationMembership" DROP CONSTRAINT "OrganizationMembership_userId_fkey";

-- DropTable
DROP TABLE "public"."Organization";

-- DropTable
DROP TABLE "public"."OrganizationMembership";

-- DropTable
DROP TABLE "public"."Role";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."BreedType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "originRegion" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "BreedType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HealthStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "severityLevel" INTEGER,
    "notes" TEXT,

    CONSTRAINT "HealthStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Buffalo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "breedTypeId" TEXT NOT NULL,
    "healthStatusId" TEXT NOT NULL,
    "ageInMonths" INTEGER NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "lactationStage" TEXT NOT NULL,
    "lastCheckupDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Buffalo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Buffalo_tagId_key" ON "public"."Buffalo"("tagId");

-- AddForeignKey
ALTER TABLE "public"."Buffalo" ADD CONSTRAINT "Buffalo_breedTypeId_fkey" FOREIGN KEY ("breedTypeId") REFERENCES "public"."BreedType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Buffalo" ADD CONSTRAINT "Buffalo_healthStatusId_fkey" FOREIGN KEY ("healthStatusId") REFERENCES "public"."HealthStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
