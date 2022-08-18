const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.get('/discord', passport.authenticate('discord'), (req, res) => {
    res.sendStatus(200);
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.sendStatus(200);
});

module.exports = router;