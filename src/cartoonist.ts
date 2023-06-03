import prisma from "./prisma-client.js";

import { errorChecked } from "./utils.js";

import comicsCartoonistRouter from "./comics_cartoonist.js";

import { Request, Router } from "express";
const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.cartoonist.findMany({});
    res.status(200).json({
      cartoonists: result,
      ok: true,
    });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newCartoonist = await prisma.cartoonist.create({
      data: req.body,
    });
    res.status(200).json({ newCartoonist });
  })
);

export interface RequestWithCartoonistName extends Request {
  cartoonistName: string;
}

router.use("/:name", async (req: RequestWithCartoonistName, res, next) => {
  const { name } = req.params;
  req.cartoonistName = name;
  next();
});

router.get(
  "/:name",
  errorChecked(async (req: RequestWithCartoonistName, res) => {
    const oneCartoonist = await prisma.cartoonist.findUniqueOrThrow({
      where: { name: req.cartoonistName },
    });
    res.status(200).json(oneCartoonist);
  })
);

router.put(
  "/:name",
  errorChecked(async (req: RequestWithCartoonistName, res) => {
    const updatedCartoonist = await prisma.cartoonist.update({
      where: { name: req.cartoonistName },
      data: req.body,
    });
    res.status(200).json(updatedCartoonist);
  })
);

router.delete(
  "/:name",
  errorChecked(async (req: RequestWithCartoonistName, res) => {
    const deletedCartoonist = await prisma.cartoonist.delete({
      where: { name: req.cartoonistName },
    });
    res.status(200).json(deletedCartoonist);
  })
);

router.use("/:name/comics", comicsCartoonistRouter);

export default router;
