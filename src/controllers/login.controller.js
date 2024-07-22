import { User } from "../modules/User.js";
import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config'

const TOKEN_KEY = process.env.TOKEN_KEY;

export const loginUser = async (req, res) => {
  const {name, password} = req.body;

  try {
    // Find user
    const user = await User.findOne({
      where: {
        name,
        password
      }
    })
    
    if(!user) return res.status(404).json({ message: "User don't found or doesn't exists"})
    
    // Generarte token
    const token = jsonwebtoken.sign(
      // Token user info
      {id: user.id, admin: user.admin},
      // Secret key to generate token sing
      TOKEN_KEY,
      // Token lifetime
      {expiresIn: "2h"}
    );

    // Save token in a web cookie
    res.cookie('jwt', token)

    return res.status(200).json({ token: token});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}