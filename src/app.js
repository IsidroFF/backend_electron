import express from 'express'
import usersRouter from "./routes/users.routes.js";
import taskRouter  from "./routes/tasks.routes.js"

const app = express();
app.use(express.json());

// Users routes controllers
app.use(usersRouter);
app.use(taskRouter);

export default app;
