import { User } from "../modules/User.js";
import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config'
import bcrypt from "bcryptjs";

const TOKEN_KEY = process.env.TOKEN_KEY;

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find user in database
    const user = await User.findOne({
      where: {
        correo
      }
    })

    // Error if user doesn't exists in DB
    if (!user) return res.status(404).json({ message: "User don't found or doesn't exists" })

    // Compare user password with request password
    const passwordCompare = await bcrypt.compare(password, user.password);
    
    // Error if password doesn't match
    if (!passwordCompare) return res.status(400).json({ message: "Login with proper credentials!"});


    // Generarte token
    const token = jsonwebtoken.sign(
      // Token user info
      { id: user.id, admin: user.admin },
      // Secret key to generate token sing
      TOKEN_KEY,
      // Token lifetime
      { expiresIn: "1d" }
    );

    // Save token in a web cookie
    res.cookie('jwt', token)

    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}