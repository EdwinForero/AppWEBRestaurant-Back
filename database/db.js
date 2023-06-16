const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/dweb_db';

const db = async () => {
    await mongoose.connect(mongoURL,{
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Funciona'))
    .catch((error) => console.log(error));
}

module.exports = db;