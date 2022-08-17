const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { sessionSecret, port } = require('./config.json');
require('./strategies/discord');

//Routes
const authRoute = require('./routes/auth');

const app = express();

app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRoute);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));