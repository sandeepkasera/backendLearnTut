const whitelist = [
    'https://www.google.com',
    'https://mysite.com'
];
const corsOptions = {
    origin: (origin, callback) => { // console.log(origin);
        // !origin is for localhost 
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed due to cors policy'));
        }
    }, optionSuccessStatus: 200
}

module.exports = corsOptions;