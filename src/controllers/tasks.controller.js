import { Task } from "../modules/Task.js";
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

const TOKEN_KEY = process.env.TOKEN_KEY;

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
    // Get token from headers
    const token = req.headers['authorization'].split(' ').pop();
    // Get user data from token
    const tokenData =  jsonwebtoken.verify(token, TOKEN_KEY);

    try {
        const task =  await Task.findAll({
            where: {
                UserId: tokenData.id
            },
            attributes:["id","name","content","done","deadline", "UserId"],
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
            attributes: ["id","name","content","done","deadline", "UserId"]
        });

        return res.status(200).json(task);
    } catch (error) {
        
    }

}
