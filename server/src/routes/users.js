const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");

var router = express.Router();

router.post("/users/register", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();

    const token = await user.generateAuthToken();
    // check status codes at https://www.webfx.com/web-development/glossary/http-status-codes/
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    console.log("LOGIN: ", req.body);
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    console.log("USER: ", user);
    const token = await user.generateAuthToken();
    console.log("TOEKN: ", token);
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "password"];

  // every returns false if even one of the checks returns false
  const isValidOperation = updates.every(
    (update) =>
      /* {
    return */ allowedUpdates.includes(update)
    /* } */
  );

  if (!isValidOperation) res.status(400).send({ error: "Invalid updates!" });

  try {
    // we do this to make sure out middleware runs since findByIdAndUpdate bypasses it
    updates.forEach((update) => {
      // we dont know exact value so instead of .name for example we use [update]
      // this is done to trigger middleware form the model, since pathing is more complex than the save
      req.user[update] = req.body[update];
    });
    await req.user.save();

    return res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    return res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
