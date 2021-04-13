const atob = require('atob')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('./jwt-helper')

describe('Helper Test', () => {
  const parseJwt = (token) => {
    return (JSON.parse(atob(token.split('.')[1])))
  }

  it('Access token is signed with user id', async () => {
    const userId = 'test_access_id'
    const token = await signAccessToken(userId)
    expect(token).toBeTruthy()
    expect(parseJwt(token)).toBeTruthy()
    expect(parseJwt(token).aud).toBe('test_access_id')
  })

  it('Refresh token is signed with user id', async () => {
    const userId = 'test_refresh_id'
    const token = await signRefreshToken(userId)
    expect(token).toBeTruthy()
    expect(parseJwt(token)).toBeTruthy()
    expect(parseJwt(token).aud).toBe('test_refresh_id')
  })
})