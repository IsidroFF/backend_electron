// Router de la clase express
import { Router, urlencoded } from "express";
// Controladores para el crus de Usuarios
import { getUsers, getUser, putUser, deleteUser } from "../controllers/users.controllers.js";
// Middlewares para verificacion de token y rol de usuario
import { userRolAuth, verifyToken } from "../middlewares/auth.middleware.js";

// Instanciamos el router
const router = Router();

// Ruta para obterner todos los usuarios, solo puede ser usada por adminstradores
router.get('/', verifyToken, userRolAuth, getUsers);

// Ruta para consultar UN solo usuario, solo puede ser usada por adminstradores
//    requiere un param con el id del usuario a buscar
router.get('/:id', verifyToken, getUser);

// Ruta para eliminar usuarios, solo puede ser usada por adminstradores
//   requiere un param con el id del usuario a eliminar
router.delete('/:id', verifyToken, userRolAuth, deleteUser);

// Ruta para actualizar usuarios, requiere un param con el id del usuario
router.put('/:id', verifyToken, putUser);

// Exportamos el router creado
export default router;
