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
        name
      }
    })

    if (!user) return res.status(404).json({ message: "User don't found or doesn't exists" })

    const passwordCompare = await bcrypt.compare(password, user.password);
    
    if (!passwordCompare) return res.status(400).json({ message: "Login with proper credentials!"});


    // Generarte token
    const token = jsonwebtoken.sign(
      // Token user info
      { id: user.id, admin: user.admin },
      // Secret key to generate token sing
      TOKEN_KEY,
      // Token lifetime
      { expiresIn: "2h" }
    );

    // Save token in a web cookie
    res.cookie('jwt', token)
    // setCookie('jwt-function', token, 1);

    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}