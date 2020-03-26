const { Router } = require("express");
const router = Router();
const bookController = require('../controllers/book')

router.get('/', bookController.list);

module.exports = router;