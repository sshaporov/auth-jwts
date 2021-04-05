const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB')
})

mongoose.connection.on('error', (rr) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', (rr) => {
    console.log('Mongoose connection is disconnected')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})