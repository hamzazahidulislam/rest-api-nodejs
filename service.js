// third party Module
const exprees = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
// end third party module

// data base conction
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/contacts-db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('Dtabase Connection Established')
})
// end database conection

//  own routes
const contactRoute = require('./api/routes/contact-routes')
const userRoute = require('./api/routes/user')
// end own routes


// uses modules
const app = exprees()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// end uses modules

// app port
const PORT = process.env.PORT || 8080

// Routes / urls
app.use('/api/contacts', contactRoute)
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
    res.send('hi')
})
// end Routes / urls

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`)
})
// end port