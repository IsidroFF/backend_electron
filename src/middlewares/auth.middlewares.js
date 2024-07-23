import 'dotenv/config'
import jsonwebtoken from "jsonwebtoken";

// Controlador del login
const TOKEN_KEY = process.env.TOKEN_KEY;

export const verifyToken = (req, res, next) => {
  // Get cookie token 
  const token = req.cookies.jwt

  if (!token) return res.status(401).send("Token requerido");

  jsonwebtoken.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send("Token invalido");
    next();
  });
}

export const userRolAuth = async (req, res, next) => {
  try {
    // Get cookie token
    const token = req.cookes.jwt;
    // Get user data from token
    const tokenData = jsonwebtoken.verify(token, TOKEN_KEY);

    // Verify if user is a admin
    if (!tokenData.admin) return res.status(409).json({ message: "You do not have permission" })

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
