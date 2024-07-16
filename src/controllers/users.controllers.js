import { User } from "../modules/User.js";

export const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
}

export const createUser = async (req, res) => {
  const {name, password, admin, correo} = req.body;

  const newUser = await User.create({
    name,
    password,
    admin,
    correo
  });

  res.json(newUser);
}


