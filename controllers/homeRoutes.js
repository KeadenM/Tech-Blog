const router = require('express').Router();

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('home', {isMainPage: true, loggedin: req.session.loggedin});
})

router.get('/login', async (req, res) => {
    if(req.session.loggedin) {
        res.render('home', {isMainPage: true, loggedin: req.session.loggedin});
    } else {
        res.render('home', {isLoginPage: true})
    }
})

module.exports = router;