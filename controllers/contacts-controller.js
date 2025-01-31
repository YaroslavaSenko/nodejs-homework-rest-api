const fs = require("fs/promises")
const path = require("path")
const {HttpError} = require('../helpers')

const {ctrlWrapper} = require("../decorators")
const Contact = require('../models/contact')
const contactDir = path.join(__dirname, "../", "temp");

const getAllContacts = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Contact.find({owner}).populate("owner", "name email");
  res.json(result);
};

// const getAllContacts = async (req, res) => {
//   const{_id: owner} = req.user;
//   const {page =1, limit = 10, ...query} = req.query;
//   const skip = (page - 1) * limit;
//    const result = await Contact.find({owner, ...query}, {skip, limit})
//    .populate("owner", "name email");
//    res.json(result)   
//   }

  const getContactById = async (req, res) => {
      const { id } = req.params;
      const result = await Contact.findById(id);
      if (!result) {
      throw HttpError(404, `Not found`)
      }
      res.json(result)
  }

const addContact = async (req, res) => {

  const{_id: owner} = req.user;
  const {path: oldPath, filename} = req.file;
  const newPath = path.join(contactDir, filename);
  await fs.rename(oldPath,newPath)
  const poster = path.join( "avatars", filename)
const result = await Contact.create(...req.body, poster, owner)
res.status(201).json(result)
}

const updateContactById = async (req, res) => {    
    const { id } = req.params; 
          const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
          if (!result) {
            throw HttpError(404, "Not found")
            }
          res.json(result)
        }

const updateStatusContact = async (req, res) => {    
  const { id } = req.params; 
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
  if (!result) {
    throw HttpError(404, "Not found")
    }
  res.json(result)
}


const deleteContactById = async (req, res) => {
const { id } = req.params;
const result = await Contact.findByIdAndDelete(id)
if (!result) {
 throw HttpError(404, `Not found`)
 }
  res.status(200).json({
 message: "contact deleted"
   })
 }

        
module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteContactById: ctrlWrapper(deleteContactById),
}