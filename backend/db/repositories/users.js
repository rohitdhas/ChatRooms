const User = require("./db/models/UserSchema");
const bcrypt = require("bcrypt");
const passport = require("passport");

const createNewUser = (username, password) => {

  return new Promise((resolve, reject) => {
    User.findOne({ username }, async (err, doc) => {
      try {
        if (err) reject(err);
        if (doc) resolve({userExists: true});
        else {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = User({
            username,
            password: hashedPassword,
          });
          await newUser.save();
          resolve({
            userExists: false,
            username,
          });
        }
      } catch(err) {
        reject(err);
      }
    });

  });
}

module.exports = {
  createNewUser
}