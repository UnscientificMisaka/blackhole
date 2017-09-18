const router = require('express').Router();
const control = require('./controllers/control');
const store = require('./controllers/store');
const limit = require('./middlewares/limit');

router.post('/api/collect/:table', limit.dayLimit, store.storeData);
router.get('/api/collect/:table', limit.dayLimit, store.getData);

router.get('/', control.renderControl);
router.post('/control/add', control.createTable);


module.exports = router;