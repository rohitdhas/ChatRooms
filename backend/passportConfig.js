const User = require("./db/models/UserSchema");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) throw err;
        if (!user)
          return done(null, false, { message: "User Doesn't Exist❌" });
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) throw err;
          if (res) {
            return done(null, user);
          } else return done(null, false, { message: "Incorrect Password!❌" });
        });
      });
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      const safeData = { username: user.username };
      done(err, safeData);
    });
  });
};
