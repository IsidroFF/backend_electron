// Controladores para el CRUD de tareas
import { getTask, getTasks, updateTask, deleteTask, createTask } from "../controllers/tasks.controller.js";
// Clase router de la libreria de express
import { Router } from "express";
// Middleware para verifiar que los tokens de las peticiones sean validos
import { verifyToken } from "../middlewares/auth.middleware.js";

// Instanciamos el router
const router =  Router();

// Para todas las rutas primero verficamos que el token sesa valido

// Ruta get soliciata un param id para consultar UNA sola tarea, 
router.get("/:id", verifyToken, getTask);

// Ruta get para consultar todas las tareas
router.get("/",verifyToken, getTasks);

// Ruta para actualizar, solicita un param id
router.put("/:id",verifyToken, updateTask);

// Ruta para eliminar, solicita un param id
router.delete("/:id",verifyToken, deleteTask);

// Ruta para crear una nueva tarea
router.post("/",verifyToken, createTask);

// Exportamos el router creado
export default router;