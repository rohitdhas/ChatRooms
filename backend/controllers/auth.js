const app = require('express')();
const router = app.Router();
const passport = require("passport");
const { createNewUser } = require('./../repositories/users');

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(info.message);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated✅");
      });
    }
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await createNewUser(username, password);
    if(user.userExists) {
      res.send({message: 'User already exists!'});
    } 

    res.send({message: 'User created successfully',
              username: user.username});
  } catch(err) {
    res.send({message: 'Oops, something went wrong.'});
  }

  User.findOne({ username }, async (err, doc) => {
    if (err) console.log(err);
    if (doc) res.send("User already exist!");
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send({
        message: "User Created✅",
        data: { username, hashedPassword },
      });
    }
  });
});

app.get('/logout', function(req, res){
    req.logout();
});

module.exports = router;