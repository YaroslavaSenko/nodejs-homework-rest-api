const { ctrlWrapper } = require("../decorators")
const { User } = require("../models/user")



const register = async(req, res) => {
const newUser = await User.create(req.body);

res.status(201).json({
    email: newUser.email,
    password: newUser.password,
})
}


module.exports = {
    register: ctrlWrapper(register),
}