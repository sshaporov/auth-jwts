const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh-token', authController.refreshToken)
router.delete('/logout', authController.logout)

router.get('/test', async (req, res, next) => {
    res.send({message: 'test response'})
})

module.exports = router