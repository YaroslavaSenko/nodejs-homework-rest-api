
// const {HttpError} = require('../helpers')

const {ctrlWrapper} = require("../decorators")
const Contact = require('../models/contact')


const getAllContacts = async (req, res) => {
   const result = await Contact.find();
   res.json(result)   
  }

//   const getContactById = async (req, res) => {
//       const { id } = req.params;
//       const result = await contacts.getContactById(id);
//       if (!result) {
//       throw HttpError(404, `Contact with ${id} not found`)
//       }
//       res.json(result)
//   }

const addContact = async (req, res) => {
const result = await Contact.create(req.body)
res.status(201).json(result)
}

// const updateContactById = async (req, res) => {    
//     const { id } = req.params; 
//           const result = await contacts.updateContact(id, req.body)
//           if (!result) {
//             throw HttpError(404, "Not found")
//             }
//           res.json(result)
//         }

// const deleteContactById = async (req, res) => {
// const { id } = req.params;
// const result = await contacts.removeContact(id)
// if (!result) {
//  throw HttpError(404, `Not found`)
//  }
//   res.status(200).json({
//  message: "contact deleted"
//    })
//  }

        
module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    // getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    // updateContactById: ctrlWrapper(updateContactById),
    // deleteContactById: ctrlWrapper(deleteContactById),
}