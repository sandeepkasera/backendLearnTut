require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3000;


//connect to Mongo DB
connectDB();

//custom middleware 
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentails requirement

app.use(credentials);

// Cross origin Resource sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data 
// in other words form data 
// 'content-type: applicatio/x-www-form-urlencoded' 
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json 
app.use(express.json());

// middleware for cookies
app.use(cookieParser());
// serve static files
app.use('/', express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));


app.use(verifyJWT); // everything after this line will verify jwt token
app.use('/employees', require('./routes/api/employees'));


// routes
//cross origin resource sharing 

app.use(cors(corsOptions));



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

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`server running on PORT ${PORT}`);
    })
})
