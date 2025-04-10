const express = require('express');
var router = express.Router();

const pianoController = require('../controllers/pianoController')

router.get('/index', pianoController.index);


module.exports = router;
