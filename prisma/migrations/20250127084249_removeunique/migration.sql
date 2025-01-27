-- CreateTable
CREATE TABLE "Rezept" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "header_img" TEXT,
    "rating" REAL,
    "creator" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RezeptStep" (
    "step_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "rezeptId" INTEGER,
    CONSTRAINT "RezeptStep_rezeptId_fkey" FOREIGN KEY ("rezeptId") REFERENCES "Rezept" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Zutat" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT,
    "amount" TEXT,
    "rezeptId" INTEGER,
    CONSTRAINT "Zutat_rezeptId_fkey" FOREIGN KEY ("rezeptId") REFERENCES "Rezept" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
