const path = require('path');
const express = require('express');

const indexRouter = require('./routes/index');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use(indexRouter);

// Server Start
app.listen( 3200, () => {
    console.log('Server Running at 3200 PORT');
} );