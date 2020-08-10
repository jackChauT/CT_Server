require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const createError = require('http-errors');
const mongo = require('./models/init')

app.use(morgan(process.env.NODE_ENV))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

mongo.init()

app.use(require('./routes'));
app.use(createError)

app.use((err, req, res, next) => {
    console.warn(err)
    res.status(err.status || 500)
    res.send({
        error: {
            message: err.message
        }
    })
})

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3344;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
