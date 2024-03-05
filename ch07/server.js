const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3000;


//custom middleware 
app.use(logger);

// built-in middleware to handle urlencoded data 
// in other words form data 
// 'content-type: applicatio/x-www-form-urlencoded' 
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json 
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve('./public')))
console.log(path.join(__dirname, '/public'));

//cross origin resource sharing 
const whitelist = ['https://www.google.com', 'https://mysite.com']
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
app.use(cors(corsOptions));
app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.get('/new-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})
app.get('/old-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    res.redirect(301, '/new-page.html');
})
// Route handlers 
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.end('Hellow World!');
})

// chaining route handlers 
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res, next) => {
    console.log('three');
    res.send('Finished');
}
app.get('/chain(.html)?', [one, two, three]);

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}) 
// app.all('*', (req, res) => { 
// res.status(404);
// if (req.accepts('html')) { 
// res.sendFile(path.join(__dirname), 'views', '404.html')
// } 
// if (req.accepts('json')) { 
// res.json({error: "404 Not found"})
// } else { 
// res.type('txt').send("404 not found") 
// } 
// }) 
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
})
