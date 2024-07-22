import { getTask, getTasks, updateTask, deleteTask, createTask } from "../controllers/tasks.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/login.middlewares.js";

const router =  Router();

// TODO: Probar las rutas localhost:3000/
router.get("/:id", verifyToken, getTask);
router.get("/",verifyToken, getTasks);
router.put("/:id",verifyToken, updateTask);
router.delete("/:id",verifyToken, deleteTask);
router.post("/",verifyToken, createTask);

export default router;