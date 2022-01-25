require('dotenv').config()  
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 2030;
const router = require('./routes/router')

app.use(morgan('dev'));
app.use(express.json());
app.use('/', router)

app.get('/', (req, res) => {
    res.send('Welcome to the front page.')
});


app.listen(port, () => {
    console.log(`Listening at the port ${port}`);
});
