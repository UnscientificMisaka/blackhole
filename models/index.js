const fs = require('fs');
const path = require('path');

fs.readdirSync(__dirname).filter(model => {
    return model !== path.basename(__filename);
}).forEach(model => {
    require(`${model}`);
})

exports.User = mongoose.model('User');
exports.Superman = mongoose.model('Superman');