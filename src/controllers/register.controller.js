import { User } from "../modules/User.js";

export const registerUser = async (req, res) => {
    try {
        const { name, password, admin, correo } = req.body;

        const newUser = await User.create({
            name,
            password,
            admin,
            correo
        });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}