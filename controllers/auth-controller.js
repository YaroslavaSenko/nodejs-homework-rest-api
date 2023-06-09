const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");
const { User } = require("../models/user")
const bcrypt = require("bcryptjs")


const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(user){
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)
const newUser = await User.create({...req.body, password: hashPassword });

res.status(201).json({
    email: newUser.email,
    password: newUser.password,
})
}


const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        throw HttpError(401, "Email or password is wrong")
    }

const passwordCompare = await bcrypt.compare(password, user.password);
if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong")
}
const token = "exampletoken"


res.status(200).json({
    token,
    
  })
}



module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}