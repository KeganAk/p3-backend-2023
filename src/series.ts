import prisma from "./prisma-client.js";

import { Router } from "express";
const router = Router();

// GET /forums/
// GET /forums/:id
// POST /forums/
// PUT /forums/:id
// DELETE /forums/:id

// GET /forums/:id/messages
// POST /forums/:id/messages

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

export default router;
