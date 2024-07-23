// Middlewares imports
import express from 'express'
import cookieParser from 'cookie-parser';

// Routers imports
import usersRouter from "./routes/users.routes.js";
import taskRouter from "./routes/tasks.routes.js"
import loginRouter from './routes/login.routes.js'
import registerRouter from './routes/register.routes.js'

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/cookie', function (req, res) {
  const galletitasCalientitas = req.cookies;
  const galletitasRecienHoneadas = req.signedCookies;

  res.status(200).json({ message: "Soy la ruta de cookies",
    Cookies: galletitasCalientitas,
    SignedCookies: galletitasRecienHoneadas
  })
})

// Users routes controllers
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/login', loginRouter)
app.use('/register', registerRouter);

export default app;
