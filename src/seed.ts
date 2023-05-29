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

const a3 = await prisma.author.create({
  //Crear el tercer autor (a3) "ONE"
  data: { name: "ONE" },
});

console.log(`Created author ${a3.name} (${a3.id})`);

const a4 = await prisma.author.create({
    //Crear el tercer autor (a4) "Ryousuke Tomoe"
    data: { name: "Ryousuke Tomoe" },
  });
  
  console.log(`Created author ${a4.name} (${a4.id})`);

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

const c3 = await prisma.cartoonist.create({
  //Crear el tercer dibujante (c3) "Yusuke Murata"
  data: { name: "Yusuke Murata" },
});

console.log(`Created cartoonist ${c3.name} (${c3.id})`);

const c4 = await prisma.cartoonist.create({
    //Crear el cuarto dibujante (c4) "Ryousuke Tomoe"
    data: { name: "Ryousuke Tomoe" },
  });
  
  console.log(`Created cartoonist ${c4.name} (${c4.id})`);

const e1 = await prisma.editorial.create({
  //Crear la primera editorial (e1) "NORMA"
  data: { name: "NORMA" },
});

console.log(`Created editorial ${e1.name} (${e1.id})`);

const e2 = await prisma.editorial.create({
  //Crear la segunda editorial (e2) "Ivrea"
  data: { name: "Ivrea" },
});

console.log(`Created editorial ${e2.name} (${e2.id})`);

await prisma.series.createMany({
  data: [
    //Crear primera serie One Punch-Man
    {
      title: "One Punch-Man",
      releaseDate: "31 de diciembre de 2015",
      numbersOwned: 2,
      drawing: c3.name,
      script: a3.name,
      publishingHouse: e2.name,
    },
    //Crear segunda serie Hellboy
    {
      title: "Hellboy Integral",
      releaseDate: "Diciembre 2010",
      numbersOwned: 2,
      drawing: c2.name,
      script: a2.name,
      publishingHouse: e1.name,
    },
    {
      //Crear tercera serie Zatch Bell!
      title: "Zatch Bell!",
      releaseDate: "Noviembre 2005",
      numbersOwned: 33,
      drawing: c1.name,
      script: a1.name,
      publishingHouse: e1.name,
      completed: true,
    },
    {
      //Crear cuarta serie Museum: The serial killer is laughing in the rain
      title: "Museum: The serial killer is laughing in the rain",
      releaseDate: "11 de abril de 2016",
      numbersOwned: 3,
      drawing: c4.name,
      script: a4.name,
      publishingHouse: e1.name,
      completed: true,
    },
  ],
});
