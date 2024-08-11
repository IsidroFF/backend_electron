import 'dotenv/config' // Acceso a las variables de entorno
import jsonwebtoken from "jsonwebtoken"; // Libreria para la generacion de token's

// Llave secreta para firmar token's
const TOKEN_KEY = process.env.TOKEN_KEY;

// Logica para verificar que los token's sean validos
export const verifyToken = (req, res, next) => {
  // Obtenemos el token de las cookies del navegador del usuario
  const token = req.cookies.jwt_ttimer

  // Error que se explica solo
  if (!token) return res.status(404).json({ message: 'Token no encontrado' });

  // Verificamos el token utilizanco nuestra llave secreta y el token encontrado dentro del navegado
  jsonwebtoken.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(498).json({ message: 'Token invalido' });
    next(); // Continuamos con el siguiente metodo
  });
}

// Logica para autentificar el rol del usuario
export const userRolAuth = async (req, res, next) => {
  try {
    // Obtenemos el token de las cookies del navegador del usuario
    const token = req.cookies.jwt_ttimer

    // Extraemos la informacion del usuario del token (id y rol)
    const tokenData = jsonwebtoken.verify(token, TOKEN_KEY);

    // Verificamos si el usuario tiene el rol de adminstrador
    if (!tokenData.admin) return res.status(409).json({ message: "NO tienes permisos de administrador" })

    // Continuamos con el siguiente metodo
    next();
  } catch (error) {
    // Ya tu sabe
    return res.status(500).json({ message: error.message });
  }
}
