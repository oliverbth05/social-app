const path = require('path');

const mongoose = require('mongoose');
const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('view engine', ejs);
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://oliverbth05:joejoe9124@ds163354.mlab.com:63354/social_app', null).then(
    () => { console.log('connected to mongoDB') },
    err => { console.log(err) }
);

app.get('/', (req, res) => {
    res.render('landing.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.listen(3000, () => {
    console.log('app listening')
}); 