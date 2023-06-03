import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
import { RequestWithEditorialName } from "./editorial.js";

const router = Router();

router.get(
    "/",
    errorChecked(async (req: RequestWithEditorialName, res) => {
      const comics = await prisma.series.findMany({
        where: { publishingHouse: req.editorialName },
      });
      res.status(200).json(comics);
    })
  );

  export default router;