const { Router } = require("express");
const router = Router();
const authController = require('../controllers/auth')

router.get('/login', authController.formLogin)
router.post('/login', authController.login)
router.get('/register', authController.formRegister)
router.post('/register', authController.create)
router.get('/logout', authController.logout)

module.exports = router;