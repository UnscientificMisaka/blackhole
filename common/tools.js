exports.getIP = (req) => {
    if (req.headers['x-forwarded-for']) {
        return req.headers['x-forwarded-for'].split(',')[0];
    } 
    return req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress; 
};