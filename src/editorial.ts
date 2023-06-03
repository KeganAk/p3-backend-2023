import prisma from "./prisma-client.js";

import { errorChecked } from "./utils.js";

import comicsEditorialRouter from "./comics_editorial.js"

import { Request, Router } from "express";
const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.editorial.findMany({});
    res.status(200).json({
      editorials: result,
      ok: true,
    });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newEditorial = await prisma.editorial.create({
      data: req.body,
    });
    res.status(200).json({ newEditorial });
  })
);

export interface RequestWithEditorialName extends Request {
    editorialName: string;
}

router.use("/:name", async (req: RequestWithEditorialName, res, next) => {
    const { name } = req.params;
    req.editorialName = name;
    next();
})

router.get(
  "/:name",
  errorChecked(async (req: RequestWithEditorialName, res) => {
    const oneEditorial = await prisma.editorial.findUniqueOrThrow({
      where: { name: req.editorialName },
    });
    res.status(200).json(oneEditorial);
  })
);

router.put(
  "/:name",
  errorChecked(async (req: RequestWithEditorialName, res) => {
    const updatedEditorial = await prisma.editorial.update({
      where: { name: req.editorialName },
      data: req.body,
    });
    res.status(200).json(updatedEditorial);
  })
);

router.delete(
  "/:name",
  errorChecked(async (req: RequestWithEditorialName, res) => {
    const deletedEditorial = await prisma.editorial.delete({
      where: { name: req.editorialName },
    });
    res.status(200).json(deletedEditorial);
  })
);

router.use("/:name/comics", comicsEditorialRouter);

export default router;
