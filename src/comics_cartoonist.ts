import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
import { RequestWithCartoonistName } from "./cartoonist.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req: RequestWithCartoonistName, res) => {
    const comics = await prisma.series.findMany({
      where: { drawing: req.cartoonistName },
    });
    res.status(200).json(comics);
  })
);

export default router;
