// third party module
const router = require('express').Router()
// end third party module
const userController = require('../controllers/user')
const authenticate = require('../middlware/authenticate')

router.post('/login', userController.loginController)
router.post('/register', userController.registerController)
router.get('/', authenticate, userController.getAllUser)
// end Routes /ulrs
module.exports = router