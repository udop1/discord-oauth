const { clientID, clientSecret, port } = require('../config.json');
const passport = require('passport');
const { Strategy } = require('passport-discord');

passport.use(
    new Strategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: `http://localhost:${port}/api/v1/auth/discord/redirect`,
        scope: ['identify'],
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken);
        console.log(profile);
    })
);