const request = require('supertest')
const express = require('express')
const authRoute = require('../auth.route')
const mongoose = require('mongoose')
const User = require('../../models/user.model')

const app = express()

app.use(express.json())
app.use('/auth', authRoute)

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://admin:Passw0rd@cluster0.c728u.mongodb.net/auth-tokens-test-logout?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  const collection = mongoose.connection.collections['users']
  await collection.deleteMany()

// add test data to DB
  const user = new User({
      email: "test_logout@test.com",
      password: "pass"
  })
  const savedUser = await user.save()
})

describe('User can successfully log out', () => {
    let loginResponse

    beforeAll(async () => {

      loginResponse = await request(app).post('/auth/login').send({
        email: "test_logout@test.com",
        password: "pass",
      })

      console.log(loginResponse.body.refreshToken)

      logoutResponse = await request(app).delete('/auth/logout').send({
        refreshToken: loginResponse.body.refreshToken,
      })
    })

    it("Get 204 status code", () => {
      expect(logoutResponse.status).toBe(204)
    })
   })

afterAll(async () => {
  await mongoose.connection.close()
})