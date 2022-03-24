const express = require('express');
const { Post, Comment , Image, User} = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn,async (req, res)=> {
  try{
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id, // req.user는 passport deserializeUser 할 때 생성 됨
    });
    const fullPost = await Post.findOne({
      where: { id : post.id},
      include:[
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        }
      ]
    })
    res.status(200).json(fullPost);
  }catch(error){
    console.error(error);
  }
});

router.post('/:postId/comment', isLoggedIn,async (req, res, next) => {
  try{
    // post가 존재하는 지 검사
    const exPost= await Post.findOne({
      where: { id: req.params.postId }
    });
    if(!exPost){
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    })
  }catch(error){

  }
});


module.exports = router;