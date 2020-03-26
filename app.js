const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/route');
const session = require('express-session')

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'TB Sencho',
    resave: true,
    saveUninitialized: true
}))

app.use('/', router);


app.listen(port, () => console.log(port));