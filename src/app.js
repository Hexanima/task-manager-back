const process = require("process")

const express = require("express")
const methodOverride = require("method-override")
require("dotenv").config();
const cors = require("cors");
const { getUsers } = require("./services/user.service");
const { getTasks } = require("./services/task.service");

const app = express();

//Config
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(methodOverride("_method"));
app.use(cors());

// Rutas

const [userRouter, taskRouter] = require("./routes")

app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))