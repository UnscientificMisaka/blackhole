const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = global.Promise;  

mongoose.connect(config.db, { useMongoClient:true },(err) => {
    if (err) {
        console.error(err.message);
    }
});

fs.readdirSync(__dirname).filter(model => {
    return model !== path.basename(__filename);
}).forEach(model => {
    require(`${model}`);  
})

// exports.User = mongoose.model('User');
// exports.Superman = mongoose.model('superman');