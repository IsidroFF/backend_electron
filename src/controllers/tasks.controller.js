import { Task } from "../modules/Task.js"; // Modelo de tareas
import jsonwebtoken from 'jsonwebtoken'; // Libreria para los token's
import 'dotenv/config'; // Variables de entorno para la app

// Llave secreta para firmar token's
const TOKEN_KEY = process.env.TOKEN_KEY;

// Logica para la creacion de tareas
export const createTask = async (req, res) => {
    try {
        // Extraemos los datos de la nueva tarea del request
        const {name, content, done, deadline, UserId} = req.body;

        // Creamos la nueva tarea usando el modelo
        const newTask =  Task.create({
            name, content, done, deadline, UserId
        });

        // Error en caso de no crear una tarea vacia
        if(!newTask) return res.status(401).json({message: 'La tarea no ha podido ser creada'});

        // Regremos una creacon de tarea exitosa y como informacion adicional la tarea creada en formato JSON
        return res.status(201).json(newTask);
    } catch (error) {

        // Cualquier error durante el proceso sera interno del servidor y se enviara el mensaje generado
        return res.status(500).json({
            message: error.message
        })
    }
}

// Logica para obtener las tareas del usuario
export const getTasks = async (req, res) => {
    // Obtener el token que guardamos como cookie 
    const token = req.cookies.jwt_ttimer;

    // Error por falta de token en el navegador del usuario
    if(!token) return res.status(404).json({ message: 'Token no encontrado'});

    // Extraemos la informacion que guardamos dentro del token (id y rol)
    const tokenData =  jsonwebtoken.verify(token, TOKEN_KEY);

    try {
        // Buscamos las tareas del usuario
        const tasks =  await Task.findAll({
            where: {
                UserId: tokenData.id
            },
            // Solicitamos el id, nombre, contenido, estado, fecha de entrega e id del usuario de cada tarea
            attributes:["id","name","content","done","deadline", "UserId"],
            // Las ordemos por el id unico de cada tarea
            order: [["deadline","DESC"]],
        });

        // Error en caso de que el usuario no tenga tareas agregadas
        if(!tasks) return res.status(404).json({ message: 'El usuario no tiene tareas agregadas'})

        // Regremos una busqueda exitosa y las encontradas como informacion adicional
        return res.status(200).json(tasks);

    } catch (error) {
        // Error interno del servidor y su mensaje, en caso de ser necesario
        return res.status(500).json({
            message: error.message
        })
    }
}

// Logica para actualizar tareas
export const updateTask = async (req, res) => {
    // Extraemos el id del URL de la peticion (esto se maneja en el front)
    const { id } = req.params;

    try {
        // Buscamos la tarea a modificar
        const taskUpdated = await Task.findOne({
            attributes: ["id","name","content","done","deadline"],
            where: {id}
        });

        // Error en caso de no encontrar la tarea
        if(!taskUpdated) return res.status(404).json({ message: 'Tarea no encontrada'});
        
        // Guardamos los datos modificados (si existen o no cambios se enviara desde el front)
        taskUpdated.set(req.body);

        // Guardamos la tarea modificada
        await taskUpdated.save();

        // Regresamos una actualizacion exitosa y la tarea modificada como informacion adicional
        return res.status(200).json(taskUpdated);
    } catch (error) {
        // Error interno del servidor y su mensaje de error en caso de ser necesario
        return res.status(500).json({
            message: error.message
        })
    }
}

// Logica para eliminar tareas
export const deleteTask = async (req, res) => {
    // Extramos el id de la tarea a eliminar desde el URL de la peticion (front!!)
    const { id } = req.params;

    try {
        // Eliminamos la tarea (bastante obvio)
        await Task.destroy({
            where: {id}
        });

        // Enviamos el id de la tarea eliminada como resultado
        return res.status(204).json({
            message: "Task deleted: " + id
        })
    } catch (error) {
        // Error interno y mensaje en caso de ser necesario
       return res.status(500).json({
        message: error.message
       }) 
    }
}

// Logica para obtener una sola tarea
export const getTask = async (req, res) => {
    // Extraemos el id de la tarea desde el URL de la peticion
    const { id } = req.params;
    
    try {
        // Busamos la tarea y solicitamos todos sus atributos
        const task = await Task.findOne({
            where: { id },
            attributes: ["id","name","content","done","deadline", "UserId"]
        });

        // Regremos una busqueda exitosa y la tarea como informacion adicional
        return res.status(200).json(task);
    } catch (error) {
        // Error interno y mensaje en caso de ser necesario
        return res.status(500).json({
            message: error.message
        });
    }
}