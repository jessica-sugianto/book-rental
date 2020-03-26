const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/route');
const multer = require('multer');
const path = require('path')
const session = require('express-session')

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
}).single('bookImage');

app.locals.helperPrice = require('./helpers/helperPrice');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('./public'))
app.use(session({
    secret: 'TB Sencho',
    resave: true,
    saveUninitialized: true
}))

app.use('/', router);


app.listen(port, () => console.log(port));