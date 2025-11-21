import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db"
import authRoutes from "./routes/authRoutes"
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import cors from "cors"

dotenv.config();
connectDB();

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server rodando na porta 3000")
});
