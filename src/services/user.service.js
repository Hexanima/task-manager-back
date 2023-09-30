const { User } = require("../database/models")

const getUsers = async () => {
    try {
        return await User.findAll({
            include: [{
                association: "tasks"
            }]
        })
    } catch (error) {
        console.log("Error while fetching users: ", error)
        throw new Error("Error fetching users")
    }
}

const getUserById = async (id) => {
    try {
        return await User.findByPk(id);
    } catch (error) {
        console.log("Error while fetching user: ", error)
        throw new Error("Error fetching user")
    }
}

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({ where: { email } })
    } catch (error) {
        console.log("Error while fetching user: ", error)
        throw new Error("Error fetching user")
    }
}

const insertUser = async (userData) => {
    try {
        return await User.create(userData)
    } catch (error) {
        console.log("Error while inserting user: ", error)
        throw new Error("Error inserting user")
    }
}

const updateUser = async (userData) => {
    try {
        return await User.update(userData, { where: { id: userData.id } })
    } catch (error) {
        console.log("Error while updating user: ", error)
        throw new Error("Error updating user")
    }
}

const deleteUser = async (userId) => {
    try {
        return await User.destroy({ where: { id: userId } })
    } catch (error) {
        console.log("Error while deleting user: ", error)
        throw new Error("Error deleting user")
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    insertUser,
    updateUser,
    deleteUser
}