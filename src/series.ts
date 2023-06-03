import prisma from "./prisma-client.js";

import { errorChecked } from "./utils.js";

import { Router } from "express";
const router = Router();

// GET /series/
// GET /series/:id
// POST /series/
// PUT /series/:id
// DELETE /series/:id

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.series.findMany({});
    res.status(200).json({
      series: result,
      ok: true,
    });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newSeries = await prisma.series.create({
      data: req.body,
    });
    res.status(200).json({ newSeries, ok: true });
  })
);

router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const oneSeries = await prisma.series.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    res.status(200).json(oneSeries);
  })
);

router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const updatedSeries = await prisma.series.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedSeries);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedSeries = await prisma.series.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedSeries);
  })
);

// GET /series/:id/messages
// POST /series/:id/messages

export default router;
