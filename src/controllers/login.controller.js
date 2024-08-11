import { User } from "../modules/User.js"; // Modelo de usuarios
import jsonwebtoken from "jsonwebtoken"; // Token de seguridad del backend (no es seguro xd)
import 'dotenv/config' // Acceso a las variables de entorno del bakcend
import bcrypt from "bcryptjs"; // Encriptacion de las contrasenas de la app

// Llave secreta para firmar los jwt generados
const TOKEN_KEY = process.env.TOKEN_KEY;

// Logica para el login de usuario
export const loginUser = async (req, res) => {
  // Extraemos el correo y la contrasena del request del front
  const { correo, password } = req.body;

  try {
    // Buscamos el usuario en la base de datos utilizando el correo que es unico para cada usuario
    const user = await User.findOne({
      where: {
        correo
      }
    })

    // Error: En caso de no encontrar el usuario
    if (!user) return res.status(404).json({ message: "Usuario no existe, o no encontrado" })

    // Hacemos la comprobacion de la contrasena reciba con la del usuario
    const passwordCompare = await bcrypt.compare(password, user.password);
    
    // Error: En caso de que las contrasenas no coincidan
    if (!passwordCompare) return res.status(400).json({ message: "Credenciales de acceso INCORRECTAS!"});


    // Generamos el token que nos brindara acceso los datos de la aplicacion
    const token = jsonwebtoken.sign(
      // Guardamos en el token el ID y el rol del usuario
      { id: user.id, admin: user.admin },
      // Llave secreta para firmar los token's
      TOKEN_KEY,
      // Tiempo de vida de los token's generados
      { expiresIn: "1d" }
    );

    if(!token) return res.status(409).json({ message: 'Error al generar el token' });

    // Guardamos el token como una cookie dentro del navegador del usuario
    res.cookie('jwt_ttimer', token)

    // Enviamos al usuario un acceso exitoso
    return res.status(200);
  } catch (error) {
    // Cualquier error se reporta como error interno del servidor y lo envia al usuario
    // (Espero que lo REPORTEN HDSPTM PINCHES USUAIROS PENDEJOS!!!)
    return res.status(500).json({ message: error.message });
  }
}