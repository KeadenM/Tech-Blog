const router = require('express').Router();
//import models (user in particular)
const User = require('../../models/User')

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        req.session.save(() => {
            req.session.loggedin = true;
            req.session.user_id = newUser.id,
            req.session.username = newUser.username
        })
        res.redirect('/')
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if(!user) {
            res.status(500).json({message: "invalid username or password!"});
            return;
        };
        const validPassword = await user.checkPassword(req.body.password)
        if(!validPassword) {
            res.status(500).json({message: "invalid username or password"})
        }
        req.session.save(() => {
            req.session.loggedin = true;
            req.session.user_id = user.id,
            req.session.username = user.username
        })
        res.redirect('/')
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/logout', (req, res) => {
    if(req.session.loggedin === true){
        req.session.destroy(() => {
            res.status(200).end();
        })
    } else {
        res.status(400).end();
    }
})

module.exports = router;