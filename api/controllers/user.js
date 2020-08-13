const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { use } = require('../routes/user')

// ceate user
const registerController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
            .then(result => {
                res.status(201).json({
                    message: "User Created Successfully",
                    user: result
                })
            })
            .catch(error => {
                res.json({
                    error
                })
            })
    })
}
// login
const loginController = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            message: "Error occured"
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ email: user.email, _id: user._id }, 'vgjVUPdu+2!j!%$GvpL+p*#4*CQhvf29y89hyjKRGY$dc', { expiresIn: '2h' })
                        res.json({
                            message: "login Successfully",
                            token
                        })
                    } else {
                        res.json({
                            message: "login Failed. password Doesn\'t match'"
                        })
                    }
                })
            } else {
                res.json({
                    message: "User not found"
                })
            }
        })
}
// get all users
const getAllUser = (req, res, next) => {
    User.find()
        .then(users => {
            res.json({
                users
            })
        })
        .catch(error => {
            res.json({
                error
            })
        })
}
module.exports = {
    registerController,
    getAllUser,
    loginController
}