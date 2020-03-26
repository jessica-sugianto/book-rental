const { Router } = require("express");
const router = Router();
const bookController = require('../controllers/book')

router.get('/', bookController.list);
router.get('/add', bookController.create);
router.post('/addDataPostgree', bookController.add);
router.get('/edit/:id', bookController.edit);
router.post('/edit/:id', bookController.editData);
router.get('/search', bookController.search);

module.exports = router;