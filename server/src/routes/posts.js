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

router.patch("/posts/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "body"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) res.status(400).send({ error: "Invalid updates!" });

  try {
    const post = await Post.findOne({
      _id: req.params.id,
    });

    if (!post) return res.status(404).send();

    updates.forEach((update) => {
      post[update] = req.body[update];
    });
    await post.save();

    return res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
    });

    if (post) return res.send(post);
    return res.status(404).send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
