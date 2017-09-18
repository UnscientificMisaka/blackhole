const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const winston = require('winston');
const expressWinston = require('express-winston');
const router = require('./router');
const config = require('./config');

const app = express();

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", 'blackhole')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});
app.use('/public',  express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: config.session.secret,
    saveUninitialized: false,
    resave: true,
    store: new RedisStore({
        port: config.redis_port,
        host: config.redis_host,
        db: config.redis_db,
        logErrors: true,
    })
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});
app.use('/', router);

app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/common.log',
          maxsize: 1024 * 1024 * 10
        })
    ]
}));

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          maxsize: 1024 * 1024 * 10
        })
    ]
}));

app.listen(config.port,'0.0.0.0', () => {
    console.log('blackhole is enlarging, hhh');
});