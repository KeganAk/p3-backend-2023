-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "numbersOwned" INTEGER NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "script" TEXT NOT NULL,
    "drawing" TEXT NOT NULL,
    "publishingHouse" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cartoonist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cartoonist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Editorial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Editorial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cartoonist_name_key" ON "Cartoonist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Editorial_name_key" ON "Editorial"("name");

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_script_fkey" FOREIGN KEY ("script") REFERENCES "Author"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_drawing_fkey" FOREIGN KEY ("drawing") REFERENCES "Cartoonist"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_publishingHouse_fkey" FOREIGN KEY ("publishingHouse") REFERENCES "Editorial"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
