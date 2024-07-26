// Middlewares imports
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Routers imports
import usersRouter from "./routes/users.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import loginRouter from './routes/login.routes.js';
import registerRouter from './routes/register.routes.js';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Cambia esto por el origen de tu frontend
  credentials: true, // Permitir cookies
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type'
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Ruta para comprobar las cookies del navegador
app.get('/cookie', function (req, res) {
  const galletitasCalientitas = req.cookies;
  const galletitasRecienHorneadas = req.signedCookies;

  res.status(200).json({ 
    message: "Soy la ruta de cookies",
    Cookies: galletitasCalientitas,
    SignedCookies: galletitasRecienHorneadas
  });
});

// Users routes controllers
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

export default app;
