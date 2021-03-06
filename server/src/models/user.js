const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("./post");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // previous entries need to be wiped if unique is introduced mid-development
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 6,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error(`Your password cannot contain the word "password"`);
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//TODO
// linking posts with users
/* userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  //foreignField: "creator",
}); */

// important for method name to be toJSON since we overwrite default befaviour
// .toJSON gets called whenever an object is stringified which happens in res.send({ user, token });
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // hiding private data by not passing it to client
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// auth token generation
// methods are available on user.
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1 hour",
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// custom login check
// statics are available on User.
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username /* : email */ });
  if (!user) throw new Error("Unable to login");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Uanble to login");

  return user;
};

// middleware added to schema
// we use a normal function because we need the .this binding
// hash the plain text pass before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // next is called when we're done, similar to done in jest testing
  next();
});

// cascade delete tasks when user creator is removed
userSchema.pre("remove", async function (next) {
  const user = this;

  //TODO
  await Post.deleteMany({ creator: user._id });

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
