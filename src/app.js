import express, { Router } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongo } from "./database/db.js";
import {routes} from"./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

export const app = express();
connectMongo();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(routes);
app.use(taskRoutes);








