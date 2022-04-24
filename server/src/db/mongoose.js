const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://bloguser:blogpass@cluster0.s3emo.mongodb.net/blogDB?retryWrites=true&w=majority` /* process.env.MONGODB_URL */
);
