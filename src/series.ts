import prisma from "./prisma-client.js";

import { Router } from "express";
const router = Router();

// GET /series/
// GET /series/:id
// POST /series/
// PUT /series/:id
// DELETE /series/:id

router.get("/", async (req, res) => {
  try {
    const result = await prisma.series.findMany({});
    res.status(200).json({
      series: result,
      ok: true,
    });
  } catch (e) {
    res.status(500).send({
      type: e.constructor.name,
      message: e.toString(),
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newSeries = await prisma.series.create({
      data: req.body,
    });
    res.status(200).json({ newSeries, ok: true });
  } catch (e) {
    res.status(500).send({
      type: e.constructor.name,
      message: e.toString(),
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneSeries = await prisma.series.findUnique({
      where: { id: Number(id) },
    });
    if (oneSeries === null) {
      return res.status(404).json({
        error: `Forum with ID ${id} not found`,
      });
    }
    res.status(200).json(oneSeries);
  } catch (e) {
    res.status(500).send({
      type: e.constructor.name,
      message: e.toString(),
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSeries = await prisma.series.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedSeries);
  } catch (e) {
    res.status(500).send({
      type: e.constructor.name,
      message: e.toString(),
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSeries = await prisma.series.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedSeries);
  } catch (e) {
    res.status(500).send({
      type: e.constructor.name,
      message: e.toString(),
    });
  }
});


// GET /series/:id/messages
// POST /series/:id/messages

export default router;
