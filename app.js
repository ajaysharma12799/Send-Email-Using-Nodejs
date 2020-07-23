require('dotenv').config();
const path = require('path');
const express = require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');

const indexRouter = require('./routes/index');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({ // EXPRESS-SESSION
    secret: 'email_using_nodejs',
    resave: true,
    saveUninitialized: true
}))

app.use(flash()); // CONNECT-FLASH

// GLOBAL VARS
app.use( (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
} )

// Routes
app.use(indexRouter);

// Server Start
app.listen( 3200, () => {
    console.log('Server Running at 3200 PORT');
} );