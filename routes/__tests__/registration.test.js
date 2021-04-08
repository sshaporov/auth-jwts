const request = require('supertest')
const express = require('express')
const authRoute = require('../auth.route')

const app = express()

app.use(express.json())
app.use('/auth', authRoute)

it("gets the test endpoint", async done => {
  const response = await request(app).get('/auth/test')

  expect(response.status).toBe(200)
  expect(response.body.message).toBe('test response');
  done()
})










// User can successfully login
// User gets an error on invalid credentials (login or password)
// User gets an error on expired token
// User can update access token using refresh token
// User can use  refresh token only once ???
// Refresh tokens become invalid on logout
// Multiple fresh tokens are valid