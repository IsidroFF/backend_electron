import bcrypt from "bcryptjs"; // Modulo para encriptcion de datos (en este caso contrasenas)

// Logica para encriptar contrasenas
export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    return secPass
}