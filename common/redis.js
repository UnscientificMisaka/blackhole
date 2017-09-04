const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }
});

module.exports = client;