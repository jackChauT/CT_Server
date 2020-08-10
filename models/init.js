const mongoose = require('mongoose');

require('./user');
require('./consultation');
require('./auth');

function init() {
    mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true , useUnifiedTopology: true});
}

module.exports = {
    init
}