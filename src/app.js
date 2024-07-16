import express from 'express'
import usersRouter from "./routes/users.routes.js";

const app = express();
app.use(express.json());

// Users routes controllers
app.use(usersRouter);

export default app;
