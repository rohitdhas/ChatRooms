require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const app = express();
const User = require("./models/UserSchema");
// _____________________END OF IMPORTS_____________________

// Database
const dbURI = process.env.MONGO_LOCAL_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose Connected!"))
  .catch((err) => console.log(err));

// _____________________END OF DATABASE_____________________

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
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
const passportInit = require("./passportConfig");
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
  const { username, password } = req.body;

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

// _____________________END OF Routes_____________________

app.listen(8080, (err) => {
  if (err) console.log(err);
  else console.log("Server running!");
});
