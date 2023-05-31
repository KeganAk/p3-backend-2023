import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import seriesRouter from './series.js'


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/series", seriesRouter);

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`Comics API listening on :${SERVER_PORT}`);
});
