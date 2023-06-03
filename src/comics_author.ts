import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
import { RequestWithAuthorName } from "./author.js";

const router = Router();

//*something*/:name/comics

router.get(
  "/",
  errorChecked(async (req: RequestWithAuthorName, res) => {
    const comics = await prisma.series.findMany({
      where: { script: req.authorName },
    });
    res.status(200).json(comics);
  })
);



export default router;
