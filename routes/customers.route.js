const express = require('express')
const router = express.Router()
const{register} = require('../controllers/customers.controllers')


router.post('/register', register)

module.exports = router