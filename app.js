const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/route');

app.locals.helperPrice = require('./helpers/helperPrice');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', router);


app.listen(port, () => console.log(port));