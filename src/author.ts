import prisma from "./prisma-client.js";

import { errorChecked } from "./utils.js";

import comicsAuthorRouter from "./comics_author.js"

import { Request, Router } from "express";
const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.author.findMany({});
    res.status(200).json({
      authors: result,
      ok: true,
    });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newAuthor = await prisma.author.create({
      data: req.body,
    });
    res.status(200).json({ newAuthor });
  })
);

export interface RequestWithAuthorName extends Request {
  authorName: string;
}

router.use("/:name", async (req: RequestWithAuthorName, res, next) => {
  const { name } = req.params;
  req.authorName = name;
  next();
});

router.get(
  "/:name",
  errorChecked(async (req: RequestWithAuthorName, res) => {
    const oneAuthor = await prisma.author.findUniqueOrThrow({
      where: { name: req.authorName },
    });
    res.status(200).json(oneAuthor);
  })
);

router.put(
  "/:name",
  errorChecked(async (req: RequestWithAuthorName, res) => {
    const updatedAuthor = await prisma.author.update({
      where: { name: req.authorName },
      data: req.body,
    });
    res.status(200).json(updatedAuthor);
  })
);

router.delete(
  "/:name",
  errorChecked(async (req: RequestWithAuthorName, res) => {
    const deletedAuthor = await prisma.author.delete({
      where: { name: req.authorName },
    });
    res.status(200).json(deletedAuthor);
  })
);

router.use("/:name/comics", comicsAuthorRouter);

export default router;
