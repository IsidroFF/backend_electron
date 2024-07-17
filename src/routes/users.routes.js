import { Router } from "express";
import { getUsers, createUser, getUser, putUser, deleteUser } from "../controllers/users.controllers.js";
const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', putUser);

export default router;
