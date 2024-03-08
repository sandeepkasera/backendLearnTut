const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    console.log('error logs', err.stack);
    logEvents(`${err.name}\t${err.message}\t${req.url}`, 'errLog.txt');
    res.status(500).send(err.message)
}

module.exports = errorHandler;