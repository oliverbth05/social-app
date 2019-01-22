const path = require('path');
const authCheck = require('./util/auth-check');

const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');

const app = express();

app.set('view engine', ejs);
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    secret: 'secret', resave: false, saveUninitialized: false
}))
app.use(authCheck);

app.use(authRoutes);
app.use(homeRoutes);


mongoose.connect('mongodb://@ds163354.mlab.com:63354/social_app', null).then(
    () => { console.log('connected to mongoDB') },
    err => { console.log(err) }
);

app.listen(process.env.PORT || 3000, () => {
    console.log('app listening')
}); 