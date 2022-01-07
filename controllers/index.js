const express = require('express')
const ykerRoutes = require('./routes.js')

const router = express.Router()

//router setup
router.use('/routes', ykerRoutes)

module.exports = router