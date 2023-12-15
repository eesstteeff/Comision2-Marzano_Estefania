import Task from "../models/task.model.js";


export const getAllTask = async(req, res)=>{
    try {
        const allTask = await Task.find({
            user:req.user.id
        });
        res.status(200).json(allTask);
    } catch (error) {
        return res.status(400).json({message:"Error al buscar todas la tareas"});   
    }
};

export const getTaskById = async(req, res)=>{
    const {id} = req.params;
    try {
        const taskFound = await Task.findById(id);
        if(!taskFound) return res.status(404).json({message:"Tarea no encontrada"});
        res.status(200).json(taskFound);
    } catch (error) {
        return res.status(400).json({message:"Error al buscar la tarea"});
    }
};
 
export const createTask = async(req, res)=>{
    const {title, description, completed}    = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            completed,
            user: req.user.id,
        });
        const taskSaved = await newTask.save();
        res.status(200).json(taskSaved);
    } catch (error) {
        return res.status(400).json({message:"Error al crear la tarea"});
        
    }
};

export const updatedTask = async(req, res)=>{
  try {
       const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate("user");
       if(!updatedTask) return res.status(404).json({message:"Tarea no encontrada"});
       res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(400).json({message:"Error al actualizar la tarea"});
    
  }  
};

export const deletedTask = async(req, res)=>{
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({message:"Tarea no encontrada"});
        res.status(200).json({message:"Tarea eliminada"});
    } catch (error) {
        return res.status(400).json({message:"Error al actualizar la area"});
    }
}; 