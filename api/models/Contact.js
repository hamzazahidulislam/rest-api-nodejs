const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const ConatactShema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    }
})

const Contact = mongoose.model('Contact', ConatactShema)
module.exports = Contact