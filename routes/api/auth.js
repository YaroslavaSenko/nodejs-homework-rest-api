const express = require("express");
const validateBody = require("../../decorators/validateBody");
const  {schemas}  = require("../../models/user");
const ctrl = require("../../controllers/auth-controller")

const router = express.Router();


router.post('/register', validateBody(schemas.registerSchema), ctrl.register)


module.exports = router;

