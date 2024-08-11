import { encryptPassword } from "../middlewares/crypt.middleware.js"; // Modulo de encriptacion de contrasenas
import { User } from "../modules/User.js"; // Modelo de usurios

// Logica para el registro de usuarios
export const registerUser = async (req, res) => {
    try {
        // Extraemos la informacion del request 
        const { name, password, admin, correo } = req.body;

        // Encriptamos la contrasena del usuario
        const secretPassword = await encryptPassword(password);

        // Creamos el usuario con la informacion recibida y le asigamos la contrasena encriptada
        const newUser = await User.create({
            name,
            password: secretPassword,
            admin,
            correo
        });

        // Regremos una creacion de usuario exitoso y como informacion adicional los datos del usuario creado
        return res.status(201).json(newUser);
    } catch (error) {
        
        // Cualquier error en el proceso lo notificamos como algo interno y enviamos el mensaje generado por el error
        return res.status(500).json({ message: error.message });
    }
}