const express = require('express')
const ykerRoutes = require('./routes.js')

const router = express.Router()

router.use('/routes', ykerRoutes)