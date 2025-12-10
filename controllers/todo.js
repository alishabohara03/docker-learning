import { Todo , } from "../models/todo.js";

export const createTodo = async (req, res) => {
    try {
        const {title, description} =req.body;
        if(!title || !description) {
            return res.status(403).json({
                sucess:false,
                message:"All fields are required.",
            })
        }
        const todo = new Todo({title, description});
        todo.save();
        return res.status(201).json({
            sucess:true,
            message:"Todo created.",
            todo,
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        console.log(todos);
        
return res.status(200).json({
    sucess:true,
    todos
})
    } catch (error) {
        console.log(error);
        
    }
}


export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const title = req.body;
 const todo = await Todo.findByIdAndUpdate(todoId, title ,{new:true});
return res.status(200).json({
    sucess:true,
    todo,
    message:"Todo updated."
})
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        await Todo.findByIdAndDelete(todoId);
        return res.status(200).json({
            sucess:true,
            message:"Todo deleted"
        })
    } catch (error) {
        console.log(error);
        
    }
}