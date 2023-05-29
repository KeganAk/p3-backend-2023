import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/series", async (req, res) => {
    try {

    }catch(e){
        
    }
})

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
    console.log(`Comics API listening on :${SERVER_PORT}`);
})