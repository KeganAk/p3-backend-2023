import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const a1 = await prisma.author.create({
  //Crear el primer autor (a1) "Makoto Raiku"
  data: { name: "Makoto Raiku" },
});

console.log(`Created author ${a1.name} (${a1.id})`);

const a2 = await prisma.author.create({
  //Crear el segundo autor (a2) "Mike Mignola"
  data: { name: "Mike Mignola" },
});

console.log(`Created author ${a2.name} (${a2.id})`);

const c1 = await prisma.cartoonist.create({
  //Crear el primer dibujante (c1) "Makoto Raiku"
  data: { name: "Makoto Raiku" },
});

console.log(`Created cartoonist ${c1.name} (${c1.id})`);

const c2 = await prisma.cartoonist.create({
  //Crear el segundo dibujante (c2) "Mike Mignola"
  data: { name: "Mike Mignola" },
});

console.log(`Created cartoonist ${c2.name} (${c2.id})`);

await prisma.series.createMany({
  data: [
    //Crear primera serie Hellboy
    {
      title: "Hellboy Integral",
      releaseDate: "Diciembre 2010",
      numbersOwned: 2,
      drawing: c2.name,
      script: a2.name,
      publishingHouse: "NORMA",
    },
    {
      //Crear segunda serie Zatch Bell!
      title: "Zatch Bell!",
      releaseDate: "Noviembre 2005",
      numbersOwned: 33,
      drawing: c1.name,
      script: a1.name,
      publishingHouse: "NORMA",
      completed: true,
    },
  ],
});
