const request = require('supertest')
const express = require('express')
const authRoute = require('../auth.route')
const mongoose = require('mongoose')
const User = require('../../models/user.model')

const app = express()

app.use(express.json())
app.use('/auth', authRoute)

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://admin:Passw0rd@cluster0.c728u.mongodb.net/auth-tokens-test-login?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  const collection = mongoose.connection.collections['users']
  await collection.deleteMany()

// add test data to DB
  const user = new User({
      email: "test_login_email@test.com",
      password: "pass"
  })
  const savedUser = await user.save()
})

describe('User can successfully log in', () => {
    let response;

    beforeAll(async () => {
      response = await request(app).post('/auth/login').send({
        email: "test_login_email@test.com",
        password: "pass"
      })
    })

    it("Get 200 status code", () => {
      expect(response.status).toBe(200)
    })

    it("Access token exist in response body", () => {
      expect(response.body.accessToken).toBeTruthy()
    })

    it("Access token is type of String", () => {
      expect(typeof response.body.accessToken === 'string').toBeTruthy()
    })

    it("Refresh token exist in response body", () => {
      expect(response.body.refreshToken).toBeTruthy()
    })

    it("Refresh token is type of String", () => {
      expect(typeof response.body.refreshToken === 'string').toBeTruthy()})
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