import 'dotenv/config'
import jsonwebtoken from "jsonwebtoken";

// Controlador del login
const TOKEN_KEY = process.env.TOKEN_KEY;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(authHeader);

  if (!token) return res.status(401).send("Token requerido");

  jsonwebtoken.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send("Token invalido");

    next();
  });
}