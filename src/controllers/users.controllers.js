import { User } from "../modules/User.js";
import { Task } from "../modules/Task.js";

// Controladores del CRUD
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'password', 'correo']
    });

    return res.status(200).json(users);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id,
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, correo, password } = req.body;

    const user = await User.findByPk(id);
    user.name = name || user.name;
    user.correo = correo || user.correo;
    user.password = password || user.password;

    await user.save();

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete task from user
    await Task.destroy({
      where: {
        id,
      }
    })

    await User.destroy({
      where: {
        id,
      }
    });
    return res.status(204);
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
