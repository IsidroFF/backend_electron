import express from 'express'

import usersRouter from "./routes/users.routes.js";
import taskRouter  from "./routes/tasks.routes.js"
import loginRouter from './routes/login.routes.js'

const app = express();
app.use(express.json());

// Users routes controllers
app.use('/api/v1/users',usersRouter);
app.use('/api/v1/tasks',taskRouter);
app.use('/login', loginRouter)

export default app;
