import { Task } from "../modules/Task.js";

// TODO: Corregir los posibles errores de los controladores
export async function createTask(req, res){
    try {
        const {name, content, done, deadline, UserId} = req.body;

        const newTask =  Task.create({
            name, content, done, deadline, UserId
        });

        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function getTasks(req, res){
    try {
        const task =  await Task.findAll({
            attributes:["id","name","content","done","deadline"],
            order: [["id","DESC"]],
        });

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function updateTask(req, res){
    const { id } = req.params;

    try {
        const task = await Task.findOne({
            attributes: ["id","name","content","done","deadline"],
            where: {id}
        });

        task.set(req.body);

        await task.save();

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export async function deleteTask(req, res){
    const { id } = req.params;
    try {
        await Task.destroy({
            where: {id}
        });

        return res.status(204).json({
            message: "Task deleted: " + id
        })
    } catch (error) {
       return res.status(500).json({
        message: error.message
       }) 
    }
}

export async function getTask(req, res){
    const { id } = req.params;
    
    try {
        const task = await Task.findOne({
            where: { id },
            attributes: ["id","name","content","done","deadline"]
        });

        return res.status(200).json(task);
    } catch (error) {
        
    }

}
