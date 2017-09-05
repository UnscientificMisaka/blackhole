exports.getIP = (req) => {
    let ip = ''; 
    if (req.headers['x-forwarded-for']) {
        ip =  req.headers['x-forwarded-for'].split(',')[0];
    } 
    ip = req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress 
    return ip;
};