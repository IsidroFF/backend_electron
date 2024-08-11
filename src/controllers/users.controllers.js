import { User } from "../modules/User.js"; // Modelo de usuarios
import { Task } from "../modules/Task.js"; // Modelo de tareas

// Logica para consultar todos los usuarios
export const getUsers = async (req, res) => {
  try {
    // Simplemente solicitamos todos los usuarios dentro de la base de datos
    const users = await User.findAll({
      attributes: ['id', 'name', 'password', 'correo']
    });

    // Error en caso de tabla de usuarios vacia
    if(!users) return res.status(404).json({ message: 'NO existen usuarios en la base de datos'})
    
      // Regresamos una busqueda exitosa y la informacion de los usarios en formato JSON
    return res.status(200).json(users);

  } catch (error) {
    // Error interno y mensaje en caso de ser necesario
    return res.status(500).json({ message: error.message });
  }
}

// Logica para consultar UN solo usuario
export const getUser = async (req, res) => {
  // Extramos el id del URL de la peticion
  const { id } = req.params;

  try {
    // Con el id buscamos al usuario en la base de datos
    const user = await User.findOne({
      where: {
        id
      }
    });

    // Error en caso de no encontrar al usuario dentro de la base de datos
    if(!user) return res.status(404).json({message: 'Usuario no encontrado'});

    // Regresamos una busqueda exitosa y la informacion del usuario en formato JSON
    return res.status(200).json(user);
  } catch (error) {
    // Error interno y mensaje en caso de ser necesario
    return res.status(500).json({
      message: error.message
    });
  }
}

// Logica para la actualizacion de los datos del usuario
export const putUser = async (req, res) => {
  try {
    // Extraemos el id del URL
    const { id } = req.params;

    // Buscamos el usuario usando el ID
    const userUpdated = await User.findByPk(id);
  
    // Error en caso de no encontrar al usuario en la base de datos
    if(!userUpdated) return res.status(404).json({ message: 'Usuario no encontrado'});

    // Le asignamos la nueva informacion al usuario
    userUpdated.set(req.body);

    // Guardamos la informacion en la base de datos
    await userUpdated.save();

    // Regresamos una actualizacion exitosa y la nueva informacion del usuario en formato JSON
    return res.status(200).json(userUpdated);
  } catch (error) {
    // Error interno y mensaje en caso de ser necesario
    return res.status(500).json({
      message: error.message
    });
  }
}

// Logica para eliminar usuarios
export const deleteUser = async (req, res) => {
  try {
    // Extraemos el id del URL de la peticion
    const { id } = req.params;

    // Eliminamos las tareas del usuario
    await Task.destroy({
      where: {
        UserId: id,
      }
    })

    // Eliminamos al usuario
    await User.destroy({
      where: {
        id,
      }
    });

    return res.status(204).json({ 
      message: 'Usuario eliminado correctamente',
      id: id
    });
  } catch (error) {
    // Ya tu sabe!
    return res.status(500).json({ message: error.message })
  }
}
