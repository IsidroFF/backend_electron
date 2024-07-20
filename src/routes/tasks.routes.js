import { getTask, getTasks, updateTask, deleteTask, createTask } from "../controllers/tasks.controller.js";
import { Router } from "express";

const router =  Router();

// TODO: Probar las rutas localhost:3000/
router.get("/task/:id", getTask);
router.get("/task", getTasks);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);
router.post("/task", createTask);

export default router;