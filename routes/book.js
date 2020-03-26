const { Router } = require("express");
const router = Router();
const bookController = require('../controllers/book')

router.get('/', bookController.list);
router.get('/add', bookController.create);
router.post('/addDataPostgree', bookController.add);
router.get('/view/:id', bookController.view);
router.get('/edit/:id', bookController.edit);
router.post('/edit/:id', bookController.editData);
router.get('/search', bookController.search);
router.get('/seeCustomer/:id', bookController.seeCustomer);
router.get('/upload/:id', bookController.uploadForm);
router.post('/upload/:id', bookController.uploadData)

module.exports = router;