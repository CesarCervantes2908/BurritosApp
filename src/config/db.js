const mongoose = require('mongoose');

const connectDB =  () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
       console.log("Connection to DB successfully"); 
    });
};

module.exports = connectDB;