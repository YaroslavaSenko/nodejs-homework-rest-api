const express = require('express')

const contactsController = require('../../controllers/contacts-controller')
const schemas = require('../../schemas/contactsSchemas')

const {isValidId, authorization, validateBody, validateFavourite} = require("../../middlewares")

const router = express.Router();

router.use(authorization)

router.get('/', contactsController.getAllContacts)

router.get('/:id', isValidId, contactsController.getContactById)

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact)

router.put('/:id', isValidId, validateBody(schemas.contactAddSchema), contactsController.updateContactById )

router.patch("/:id/favorite", isValidId, validateFavourite(schemas.contactUpdateFavoriteSchema), contactsController.updateStatusContact)

router.delete('/:id', isValidId, contactsController.deleteContactById )



module.exports = router