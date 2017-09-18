module.exports = {
    // node.js server
    port: 3105,

    db: 'mongodb://localhost:27017/blackhole',

    per_day_limit: 1000,

    session: {
        secret: 'superman',
        key: 'blackhole',
        maxAge: 2592000000
    },   

    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,
}