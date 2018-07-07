const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')

// localhost:5000/api/auth/login
router.get('/login', controller.login)



module.exports = router