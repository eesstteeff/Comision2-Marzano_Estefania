import {Router} from "express";
import { createTask, deletedTask, getAllTask, getTaskById, updatedTask } from "../controllers/task.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const routes = Router();
routes.get("/task",authRequired, getAllTask);
routes.get("/task/:id",authRequired, getTaskById);
routes.post("/task",authRequired, createTask);
routes.put("/task/:id",authRequired, updatedTask);
routes.delete("/task/:id",authRequired, deletedTask);

export default routes;  