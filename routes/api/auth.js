const express = require("express");
const {validateBody, authorization, upload} = require("../../middlewares");
const  {schemas}  = require("../../models/user");
const ctrl = require("../../controllers/auth-controller")

const router = express.Router();


router.post('/register', validateBody(schemas.registerSchema), ctrl.register)
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)
router.get("/current", authorization, ctrl.getCurrent);
router.post("/logout", authorization, ctrl.logout )
router.patch("/avatars", authorization, upload.single("avatar"), ctrl.updateAvatar)
module.exports = router;

