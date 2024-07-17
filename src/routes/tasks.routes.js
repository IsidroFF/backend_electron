import { getTask, getTasks, updateTask, deleteTask, createTask } from "../controllers/tasks.controller.js";
import { Router } from "express";

const router =  Router();

// TODO: Probar las rutas localhost:3000/

router.get("/:id", getTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/", createTask);

export default router;