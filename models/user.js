const {Schema, model} = require('mongoose')
const {handleMongooseError} = require('../helpers')
const Joi = require('joi')


const userSchema = new Schema({
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        avatarURL: {
          type: String,
        },
        token: {
          type: String
        },
        verify: {
            type: Boolean,
            default: false,
          },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
          },
        

}, {versionKey: false, timestamps: true})


userSchema.post("save",handleMongooseError )

const registerSchema = Joi.object({
    password: Joi.string().min(3).max(30).required().messages({
        'any.required': `missing required password field`,
        
      }),
      email: Joi.string().required().messages({
        'any.required': `missing required email field`,
        
      }),
      
})

const loginSchema = Joi.object({
    password: Joi.string().min(3).max(30).required().messages({
        'any.required': `missing required password field`,
        
      }),
      email: Joi.string().required().messages({
        'any.required': `missing required email field`,
        
      }),
           
})
const verifySchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': `missing required email field`,
})
})

const schemas = {
    registerSchema,
    loginSchema,
    verifySchema,
}

const User = model("user",userSchema )

module.exports ={
    User,
    schemas,
  }

//   {
//     "email": yaroslava@ukr.net,
//     "password": 12345
// }

// http://localhost:3000/api/auth/register