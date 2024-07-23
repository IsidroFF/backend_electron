import { Router } from "express";
import { getUsers, getUser, putUser, deleteUser } from "../controllers/users.controllers.js";
import { userRolAuth, verifyToken } from "../middlewares/auth.middlewares.js";
const router = Router();

router.get('/', verifyToken, userRolAuth, getUsers);
router.get('/:id', verifyToken, getUser);
router.delete('/:id', verifyToken, userRolAuth, deleteUser);
router.put('/:id', verifyToken, putUser);

export default router;
