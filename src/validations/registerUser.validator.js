const { check, body } = require("express-validator");
const { getUserByEmail } = require("../services/user.service")

const userRegisterValidationRules = () => {
    return [
        check("username")
            .notEmpty().withMessage("Ingrese un usuario"),
        check("pass")
            .notEmpty().withMessage("Ingrese una contraseña")
            .isLength({ min: 6, max: 12 }).withMessage("La contraseña debe tener entre 6 y 12 caracteres"),
        check("email")
            .notEmpty().withMessage("Debe ingresar un mail")
            .isEmail().withMessage("Mail invalido"),
        body("email").custom(async (value) => {
            const user = await getUserByEmail(value);
            if (user) {
                return Promise.reject("Este mail ya existe")
            }
        }),
        body("pass2").custom((value, {req}) => (value !== req.body.pass ? false : true)).withMessage("Las contraseñas deben ser iguales")
    ]
}

module.exports = userRegisterValidationRules