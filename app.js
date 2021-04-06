const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const authRoute = require('./routes/auth.route')
require('dotenv').config()
require('./helpers/init-mongodb')
const {verifyAccessToken} = require('./helpers/jwt-helper')
const client = require('./helpers/init-redis')

client.SET('foo', 'sss')
client.GET('foo', (err, value) => {
    if(err) console.log(err.message)
    console.log(value)
})


const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', verifyAccessToken, async (req, res, next) => {
    res.send('hello from express')
})

app.use('/auth', authRoute)

app.use(async (req, res, next) => {
    // const error = new Error('Not found')
    // error.status = 404
    // next(error)
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

const PORT = process.env.PORT || 3010

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`)
})
