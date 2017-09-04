const router = require('express').Router();
const superman = require('./controllers/superman');

router.get('/api/superman/collect', superman.collect)


module.exports = router;