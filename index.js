const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const router = require('./router');

const app = express();

app.use('/public',  express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});
app.use('/', router);

app.listen(3000,'0.0.0.0', () => {
    console.log('blackhole is enlarging, hhh');
});