module.exports = (sequelize, dataTypes) => {
    const alias = "Task";

    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
        },
        state: {
            type: dataTypes.STRING(50),
            allowNull: false,
            defaultValue: "pending"
        },
        started_at: {
            type: dataTypes.DATE
        },
        finished_at: {
            type: dataTypes.DATE
        },
        deadline: {
            type: dataTypes.DATE
        },
    }

    const config = {
        tableName: "tasks",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const TASK = sequelize.define(alias, cols, config)

    TASK.associate = (models) => {
        TASK.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })
    }

    return TASK
}