import { Router } from "express"; // Clase router de la libreria de express
import { loginUser } from "../controllers/login.controller.js"; // Controladores del login

// Instanciamos el router
const router = Router();

// Asignamos una ruta post para el login
router.post('/', loginUser)

// Exportamos el router que hemos creado
export default router;