const { Task } = require("../database/models")

const getTasks = async () => {
    return await Task.findAll({
        include: [{
            association: "user"
        }]
    })
}

const getTaskById = async (id) => {
    try {
        return await Task.findById(id);
    } catch (error) {
        
    }
}

const getTasksByUserId = async (userId) => {
    try {
        return await Task.findAll({where: {user_id: userId}})
    } catch (error) {
        
    }
}

const getTasksByState = async (state) => {
    try {
        return await Task.findAll({where: {state}})
    } catch (error) {
        
    }
}

const insertTask = async (taskData) => {
    try {
        return await Task.create(taskData)
    } catch (error) {
        
    }
}

const updateTask = async (taskData) => {
    try {
        return await Task.update(taskData, {where: {id: taskData.id}})
    } catch (error) {
        
    }
}

const deleteTask = async (id) => {
    try {
        return await Task.destroy({where: {id}})
    } catch (error) {
        
    }
}

module.exports = {
    getTasks,
    getTaskById,
    getTasksByUserId,
    getTasksByState,
    insertTask,
    updateTask,
    deleteTask
}