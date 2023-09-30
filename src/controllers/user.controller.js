const { generateToken } = require("../helpers/jwt.helper")
const { insertUser, getUserByEmail, getUsers } = require("../services/user.service")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const process = require("process")
module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await getUsers();
            const usersResponse = users.map(({ id, name, email }) => {
                return {
                    id, name, email,
                    detail: `/api/users/${id}`
                }
            })

            const RESPONSE = {
                count: users.length,
                users: usersResponse
            };

            return res.status(200).json(RESPONSE)
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    },
    register: async (req, res) => {
        try {
            let pass = bcrypt.hashSync(req.body.pass, 10)
            console.log(req.body.pass)
            console.log(pass)
            console.log(pass.length)
            console.log(bcrypt.compareSync(req.body.pass, pass))
            const result = await insertUser({
                ...req.body,
                pass
            });

            if (result) {
                const SUCCESS_RESPONSE = "Usuario creado exitosamente"
                return res.status(201).json({ msg: SUCCESS_RESPONSE });
            } else {
                const ERROR_RESPONSE = "Algo salio mal";
                return res.status(400).json({ msg: ERROR_RESPONSE })
            }
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    },
    login: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await getUserByEmail(email);
            const token = generateToken(user)

            return res.status(200).json({ token })
        } catch (error) {
            return res.status(500).json({ Error: "Token error " + error })
        }
    }
} 