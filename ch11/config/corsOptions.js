const allowedOrigins = require('./allowedOrigins');


const corsOptions = {
    origin: (origin, callback) => { // console.log(origin);
        // !origin is for localhost 
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed due to cors policy'));
        }
    }, optionSuccessStatus: 200
}

module.exports = corsOptions;