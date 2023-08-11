const router = require('express').Router();
const {User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   try {
    const postData = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });
    const posts = postData.map((post) => post.get({plain: true}));

    res.render('home', {
        posts,
        loggedin: req.session.loggedin,
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get ('/posts/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['comment_text', 'date_created', 'user_id'],
                    include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        const post = postData.get({plain: true});
        res.render('post', {
            ...post,
            loggedin: req.session.loggedin,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedin) {
        res.redirect('/');
        return;
    }
    res.render('login', {
        title: 'Login',
    });
});


module.exports = router;