const router = require('express').Router();
const superman = require('./controllers/superman');
const limit = require('./middleeares/limit');

router.post('/api/superman/collect', limit.dayLimit, superman.collect);

module.exports = router;