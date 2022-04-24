const Post = require("../models/post");
var express = require("express");
var router = express.Router();

router.get("/posts", async (req, res) => {
  const postsDB = Post;

  // this code will get all posts
  const posts = await postsDB.find({}).exec((err, postData) => {
    if (err) throw err;
    if (postData) {
      res.end(JSON.stringify(postData));
    } else {
      res.end();
    }
  });
});

router.post("/post", async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
  });

  try {
    await newPost.save((err, newPostResults) => {
      if (err) res.end("Error Saving.");
      //res.redirect("/posts");
      res.end();
    });
  } catch (err) {
    console.log(err);
    //res.redirect("/posts");
    res.end();
  }
});

module.exports = router;
