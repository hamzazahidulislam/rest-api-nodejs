// third party module
const exprees = require('express')
const router = exprees.Router()
// end third party module

// own models 
const contactController = require('../controllers/contact')
const authenticate = require('../middlware/authenticate')
// end own models


// routes / ulrs
router.get('/', contactController.getAllContactController)//get
router.post('/', authenticate, contactController.postNewContactController)//post

router.get('/:id', contactController.getSingleContact)
router.put('/:id', authenticate, contactController.editcontact)
router.delete('/:id', authenticate, contactController.deletecontact)
// end Routes /ulrs
module.exports = router