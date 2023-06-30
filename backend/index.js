import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb"}));
app.use(cors());

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/image', imageRoutes);


app.get('/', async (req, res) => {
    res.send('fuck mechanical engin!');
})

const server = async () => {
    try {
        connectDb(process.env.MONGODB_URL)
        app.listen(8080, () => console.log('server has started mothefuckers on port http://localhost:8080'))
    } catch(error) {
        console.log(error)
    }
}

server();