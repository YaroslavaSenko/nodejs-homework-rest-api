const express = require("express");
const {validateBody, authorization} = require("../../middlewares");
const  {schemas}  = require("../../models/user");
const ctrl = require("../../controllers/auth-controller")

const router = express.Router();


router.post('/register', validateBody(schemas.registerSchema), ctrl.register)
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)
router.get("/current", authorization, ctrl.getCurrent);
router.post("/logout", authorization, ctrl.logout )

module.exports = router;

