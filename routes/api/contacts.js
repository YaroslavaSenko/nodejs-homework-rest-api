const express = require('express')

const contactsController = require('../../controllers/contacts-controller')
const schemas = require('../../schemas/contactsSchemas')

const {validateBody} = require("../../decorators")
const {isValidId, authorization } = require("../../middlewares")
const { validateReqBody } = require('../../helpers')

const router = express.Router();

router.use(authorization)

router.get('/', contactsController.getAllContacts)

router.get('/:id', isValidId, contactsController.getContactById)

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact)

router.put('/:id', isValidId, validateReqBody, validateBody(schemas.contactAddSchema), contactsController.updateContactById )

router.patch("/:id/favorite", isValidId, validateReqBody, validateBody(schemas.contactUpdateFavoriteSchema), contactsController.updateStatusContact)

router.delete('/:id', isValidId, contactsController.deleteContactById )



module.exports = router