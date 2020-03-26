const { Router } = require("express");
const router = Router();
const controller = require('../controllers')
const book = require('./book')
const auth = require('./auth')

router.use('/auth', auth)
router.get('/', controller.index)
router.use('/book', book)

module.exports = router;