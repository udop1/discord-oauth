const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const { host, user, password, database, sessionSecret, port } = require('./config.json');
require('./strategies/discord');
require('./database/index');

//Routes
const authRoute = require('./routes/auth');

const app = express();

var sessionStore = new MySQLStore({
    host: `${host}`,
    port: 3306,
    user: `${user}`,
    password: `${password}`,
    database: `${database}`
});

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
    session({
        secret: sessionSecret,
        cookie: {
            maxAge: 86400000 //1 Day
        },
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoute);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));