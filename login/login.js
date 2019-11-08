const express = require('express')
const userController = require('../user/userController')
const router = express.Router()

// curl -s  -H 'Content-type: application/json' -X POST http://localhost:5000/users -d '{"userID" : "enzo dff", "password":"pepito1"}' | jq

router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router
