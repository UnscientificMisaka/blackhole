const express = require('express');
const bodyParser = require('body-parser');
const path = requuire('path');
const router = require('./router');

const app = express();

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

app.listen(3000,'0.0.0.0', () => {
    console.log('blackhole is enlarging, hhh');
});