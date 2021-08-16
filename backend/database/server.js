const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/user");
// _____________________END OF IMPORTS_____________________

// Database
const dbURI =
  "mongodb+srv://<username>:<password>@userauthentication.niie7.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Mongoose is connected!")
);
// _____________________END OF DATABASE_____________________

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
const passportInit = require("../passportConfig");
passportInit(passport);
// _____________________END OF MIDDLEWARES_____________________

// Routes

app.post("/login", (req, res, next) => {
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

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) console.log(err);
    if (doc) res.send("User already exist!");
    else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created✅");
    }
  });
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

// _____________________END OF Routes_____________________

app.listen(8080, (err) => {
  if (err) console.log(err);
  else console.log("Server running!");
});
