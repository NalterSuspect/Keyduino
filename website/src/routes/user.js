const express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')

router.get('/login', userController.login);
router.post('/login', userController.userLogIn);
router.get('/register', userController.register);
router.post('/register', userController.userRegister);


module.exports = router;
