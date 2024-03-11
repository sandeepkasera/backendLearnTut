const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('env', process.env.DATABASE_URI);
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch(err) {
        console.error(err);
    }
}

module.exports = connectDB;