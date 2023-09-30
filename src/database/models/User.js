module.exports = (sequelize, dataTypes) => {
    const alias = "User";

    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        pass: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
    }

    const config = {
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const USER = sequelize.define(alias, cols, config)

    USER.associate = (models) => {
        USER.hasMany(models.Task, {
            as: "tasks",
            foreignKey: "user_id"
        })
    }
    
    return USER
}