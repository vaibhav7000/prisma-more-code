-- CreateTable
CREATE TABLE "public"."Citizen" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Citizen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Owner" (
    "id" SERIAL NOT NULL,
    "citizenId" INTEGER NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Property" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_citizenId_key" ON "public"."Owner"("citizenId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_ownerId_key" ON "public"."Property"("ownerId");

-- AddForeignKey
ALTER TABLE "public"."Owner" ADD CONSTRAINT "Owner_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "public"."Citizen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
