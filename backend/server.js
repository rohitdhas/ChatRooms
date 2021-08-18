require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const User = require("./db/models/UserSchema");
const app = express();
const authRouter = require("./controllers/auth");

// Database

require('./db/dbConfig');

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
app.use('/auth', authRouter);

// _____________________END OF Routes_____________________

app.listen(8080, (err) => {
  if (err) console.log(err);
  else console.log("Server running!");
});
