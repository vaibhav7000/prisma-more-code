/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Citizen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Citizen` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Citizen_username_key" ON "public"."Citizen"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Citizen_email_key" ON "public"."Citizen"("email");
