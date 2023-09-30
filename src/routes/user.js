const express = require("express")
const router = express.Router();
const controller = require("../controllers/user.controller")
const validate = require("../validations/index.validator")
const userLoginValidationRules = require("../validations/loginUser.validator");
const userRegisterValidationRules = require("../validations/registerUser.validator");

router.get("/", controller.getUsers)
router.post("/login", userLoginValidationRules(), validate, controller.login)
router.post("/register", userRegisterValidationRules(), validate, controller.register)

module.exports = router;