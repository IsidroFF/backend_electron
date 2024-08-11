import { Router } from "express"; // Clase router de la libreria de express
import { registerUser } from "../controllers/register.controller.js"; // Controlador para el registro de usuarios

// Instanciamos el router 
const router = Router();

// Le agreamos una ruta post para el registro de usuarios
router.post('/', registerUser);

// Exportamos el router creado
export default router;