const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");
const { User } = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env;
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(__dirname, "../", "public", "avatars");



const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(user){
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email);
const newUser = await User.create({
  ...req.body, 
  password: hashPassword,
  avatarURL,

});

res.status(201).json({
    user: {
        email: newUser.email,
        subscription: newUser.subscription,
      }
})
}


const login = async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    
  const {_id: id} = user;

    const payload = {
      id,
    }
  
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
     
    await User.findByIdAndUpdate(id, {token})
    res.json({
      token, 
      user: {
        email,
        subscription: user.subscription,
      }  
    });
   
  };
  
  const getCurrent = async (req, res) => {
    const {email, subscription} = req.user;
    console.log(res.user);
    res.json({
      email, 
      subscription,
    })
  }
  
  const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
    
    res.status(204).json({});
  }
  
  const updateAvatar = async (req, res) => {
    const { _id: userId } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const avatarName = `${userId}_${originalname}`;
    const resultUpload = path.join(avatarDir, avatarName);
  
    Jimp.read(tempUpload, (error, image) => {
      if (error) throw error;
      image.resize(250, 250).quality(100).write(resultUpload);
    });
    fs.unlink(tempUpload);
  
    const avatar = `avatars/${avatarName}`;
  
    await User.findByIdAndUpdate(userId, { avatarURL: avatar });
  
    res.status(200).json({
      avatarURL: avatar,
    });
  };
  module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar:ctrlWrapper(updateAvatar),
  };