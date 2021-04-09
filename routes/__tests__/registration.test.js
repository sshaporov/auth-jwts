const request = require('supertest')
const express = require('express')
const authRoute = require('../auth.route')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use('/auth', authRoute)

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
   })
});

it("simple request with saving to db", async done => {
  const response = await request(app).post('/auth/test').send({
    email: "3@gmail.com",
    password: "test"
  })
  expect(response.status).toBe(200)
  expect(response.body.email).toBeTruthy()
  expect(response.body._id).toBeTruthy()
  expect(response.body.password).toBeTruthy()
  done()
})


it("saved user data", async done => {
  const response = await request(app).post('/auth/register').send({
    email: "123@gmail.com",
    password: "test"
  })
  expect(response.status).toBe(200)
  expect(response.body.accessToken).toBeTruthy()
  expect(response.body.refreshToken).toBeTruthy()
  done()
})

afterAll(async () => {
  await mongoose.connection.close();
});










// User can successfully login
// User gets an error on invalid credentials (login or password)
// User gets an error on expired token
// User can update access token using refresh token
// User can use  refresh token only once ???
// Refresh tokens become invalid on logout
// Multiple fresh tokens are valid