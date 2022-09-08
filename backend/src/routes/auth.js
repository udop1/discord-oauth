const { Router } = require('express');
const passport = require('passport');
const { getBotGuilds } = require('../utils/api');

const router = Router();

router.get('/discord', passport.authenticate('discord'), (req, res) => {
    res.sendStatus(200);
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
});

/*router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.sendStatus(401);
    }
});*/

router.get('/guilds', async (req, res) => {
    const guilds = await getBotGuilds();
    console.log(guilds);
    res.send(guilds);
});

module.exports = router;