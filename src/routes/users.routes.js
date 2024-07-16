import { Router } from "express";
import { getUsers, createUser } from "../controllers/users.controllers.js";
const router = Router();

router.get('/users', getUsers);
router.get('/users/:id');
router.post('/users', createUser);
router.delete('/users/:id');
router.put('/users/:id');

export default router;
