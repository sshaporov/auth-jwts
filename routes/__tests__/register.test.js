const request = require('supertest')
const express = require('express')
const authRoute = require('../auth.route')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use('/auth', authRoute)

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://admin:Passw0rd@cluster0.c728u.mongodb.net/auth-tokens-test-register?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  const collection = mongoose.connection.collections['users']
  await collection.deleteMany()
})

describe('User can successfully register', () => {
    let response;

    beforeAll(async () => {
      response = await request(app).post('/auth/register').send({
        email: "test_registration_email@test.com",
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