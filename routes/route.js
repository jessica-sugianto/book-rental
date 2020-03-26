const { Router } = require("express");
const router = Router();
const controller = require('../controllers')
const book = require('./book')

router.get('/', controller.index)
router.use('/book', book)

module.exports = router;