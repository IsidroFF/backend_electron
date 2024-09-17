// Middlewares imports
// Libreria con la logica para el backend
import express from 'express';
// Libreria para el manejo de cookies
import cookieParser from 'cookie-parser';
// Libreria para permisos y control de peticiones del servidor
import cors from 'cors';
// Acceso a las variables de entorno
import 'dotenv/config'

// Routers imports
import usersRouter from "./routes/users.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import loginRouter from './routes/login.routes.js';
import registerRouter from './routes/register.routes.js';
import logoutRouter from './routes/logout.routes.js'

// Creamos la apliciacion de express
const app = express();

// URL desde donde seran enviadas las peticiones de nuestro front-end
const FRONT_URI = process.env.FRONT_URI;

// Configuración de CORS
const corsOptions = {
  origin: FRONT_URI, // URL del front
  credentials: true, // Permitir cookies
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type'
};

// Permitir JSON en las peticiones
app.use(express.json());
// Manejo de cookies
app.use(cookieParser());
// Le agregamos la configuracion del cors
app.use(cors(corsOptions));

// Ruta para comprobar las cookies (publicas?) del navegador
app.get('/cookie', function (req, res) {
  const galletitasCalientitas = req.cookies;
  const galletitasRecienHorneadas = req.signedCookies;

  res.status(200).json({ 
    message: "Soy la ruta de cookies",
    Cookies: galletitasCalientitas,
    SignedCookies: galletitasRecienHorneadas
  });
});

// Le asignamos una ruta y a su respectivo router
app.use('/api/users', usersRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/auth/login', loginRouter);
app.use('/api/auth/register', registerRouter);
app.use('/api/logout', logoutRouter);

// Exportamos la aplicacion de express creada
export default app;
