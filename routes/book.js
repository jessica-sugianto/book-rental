const { Router } = require("express");
const router = Router();
const bookController = require('../controllers/book')

router.get('/', bookController.list);
router.get('/search', bookController.search);
router.use((req, res, next) => {
    if (req.session.role === 'Admin') {
        next()
    } else if (req.session.role === 'Customer') {
        router.get('/rent/:id', bookController.rentForm);
        router.post('/rent/:id', bookController.rent);
        router.get('/return/:id', bookController.return);
        next()
    } else {
        res.redirect('/?err=User belum login')
    }
})
router.get('/add', bookController.create);
router.post('/addDataPostgree', bookController.add);
router.get('/view/:id', bookController.view);
router.get('/edit/:id', bookController.edit);
router.post('/edit/:id', bookController.editData);
// router.get('/rent/:id', bookController.rent);
router.get('/search', bookController.search);
router.get('/seeCustomer/:id', bookController.seeCustomer);
router.get('/upload/:id', bookController.uploadForm);
router.post('/upload/:id', bookController.uploadData)

module.exports = router;