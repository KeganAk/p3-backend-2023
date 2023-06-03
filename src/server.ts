import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import seriesRouter from "./series.js";
import authorRouter from "./author.js"
import cartoonistRouter from "./cartoonist.js"
import editorialRouter from "./editorial.js"
import { defaultErrorHandler } from "./utils.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/series", seriesRouter);
app.use("/author", authorRouter);
app.use("/editorial", editorialRouter);
app.use("/cartoonist", cartoonistRouter);

// Esto no mata al servidor porque Express coge nuestra excepción 
// (esté debajo de nosotros en la pila)
// app.get("/err1", (req, res) => {
//   throw new Error("Error númer UNO");
// });

// Esto se carga el servidor (porque no hay nadie debajo en la pila):
// app.get("/err2", async (req, res) => {
//   throw new Error("Error number TWO");
// });

app.use(defaultErrorHandler)

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`Comics API listening on :${SERVER_PORT}`);
});
