const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/comments', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
      });
      
      res.redirect(req.headers.referer);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;