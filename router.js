const router = require('express').Router();
const superman = require('./controllers/superman');
const control = require('./controllers/control');
const limit = require('./middlewares/limit');

router.post('/api/superman/collect', limit.dayLimit, superman.collect);

router.get('/control', control.renderControl);
router.post('/control/add', control.createTable);

module.exports = router;