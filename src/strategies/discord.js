const { clientID, clientSecret, port } = require('../config.json');
const passport = require('passport');
const { mysql } = require('../database/index');
const { Strategy } = require('passport-discord');

passport.serializeUser((user, done) => {
    console.log('Serializing user...');
    console.log(user);
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user...');
    console.log(id);

    try {
        var getUserId = function() {
            let promise = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    mysql.query("SELECT user_id FROM tbl_Users WHERE user_id = " + mysql.escape(id) + " LIMIT 1", function(error, result) {
                        if (error) throw error;
                        //console.log(result);
                        resolve(result[0]);
                    });
                }, 1000);
            });
            return promise;
        }
        var user = await getUserId();

        if (!user) throw new Error('User not found');
        console.log(user);
        done(null, user);
    } catch (error) {
        console.log(error);
        done(error, null);
    }
});

passport.use(
    new Strategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: `http://localhost:${port}/api/v1/auth/discord/redirect`,
        scope: ['identify'],
    },
    async (accessToken, refreshToken, profile, done) => {
        const { mysql } = require('../database/index');
        console.log(accessToken, refreshToken);
        console.log(profile);

        try {
            var getDiscordUser = function() {
                let promise = new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        mysql.query("SELECT user_id FROM tbl_Users WHERE user_id = " + mysql.escape(profile.id) + " LIMIT 1", function(error, result) {
                            if (error) throw error;
                            //console.log(result);
                            resolve(result[0]);
                        });
                    }, 1000);
                });
                return promise;
            }
            var discordUser = await getDiscordUser();
            
            if (discordUser) {
                console.log(`Found user: ${JSON.stringify(discordUser)}`);
                return done(null, discordUser);
            } else {
                var createDiscordUser = function() {
                    let promise = new Promise(function(resolve, reject) {
                        setTimeout(function() {
                            mysql.query("INSERT INTO tbl_Users (user_id) VALUES (" + mysql.escape(profile.id) + ")", function(error, result) {
                                if (error) throw error;
                                //console.log(result);
                                resolve(result[0]);
                            });
                        }, 1000);
                    });
                    return promise;
                }
                var newUser = await createDiscordUser();

                console.log(`Created user: ${JSON.stringify(newUser)}`);
                return done(null, newUser);
            }
        } catch (error) {
            console.log(error);
            return done(error, null);
        }
    })
);