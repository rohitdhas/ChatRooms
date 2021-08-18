require('dotenv').config();
const mongoose = require("mongoose");
const dbURI = process.env.MONGO_LOCAL_URI;

const connection = mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose Connected!"))
  .catch((err) => console.log(err));

module.exports = connection;