const { Router } = require("express");
const router = Router();
const bookController = require('../controllers/book')

router.get('/', bookController.list);
router.get('/search', bookController.search);
router.use((req, res, next) => {
    if (req.session.role === 'Admin') {
        next()
    } else if (req.session.role === 'Customer') {
        res.redirect('/?err=Bukan Admin')
    } else {
        res.redirect('/?err=User belum login')
    }
})
router.get('/add', bookController.create);
router.post('/addDataPostgree', bookController.add);
router.get('/edit/:id', bookController.edit);
router.post('/edit/:id', bookController.editData);

module.exports = router;