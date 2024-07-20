import { Router } from "express";
import { getUsers, createUser, getUser, putUser, deleteUser, loginUser } from "../controllers/users.controllers.js";
import { verifyToken } from "../middlewares/login.middlewares.js";
const router = Router();

router.get('/users', verifyToken, getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', putUser);

router.post('/login', loginUser);
export default router;
