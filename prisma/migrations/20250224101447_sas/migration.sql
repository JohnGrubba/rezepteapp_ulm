-- CreateTable
CREATE TABLE "RezeptStar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user" TEXT NOT NULL,
    "rezeptId" INTEGER NOT NULL,
    CONSTRAINT "RezeptStar_rezeptId_fkey" FOREIGN KEY ("rezeptId") REFERENCES "Rezept" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rezept" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "header_img" TEXT,
    "creator" TEXT NOT NULL,
    "serving_amount" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "RezeptStep" (
    "step_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "rezeptId" INTEGER,
    CONSTRAINT "RezeptStep_rezeptId_fkey" FOREIGN KEY ("rezeptId") REFERENCES "Rezept" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Zutat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "amount" TEXT,
    "rezeptId" INTEGER,
    CONSTRAINT "Zutat_rezeptId_fkey" FOREIGN KEY ("rezeptId") REFERENCES "Rezept" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RezeptStar_rezeptId_user_key" ON "RezeptStar"("rezeptId", "user");
