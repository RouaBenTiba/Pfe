var express = require("express");
var path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");
var userRouter = require("./routes/users");
const passport = require("passport");
const cors = require("cors");
var app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*passport*/
app.use(passport.initialize());
require("./security/passport")(passport);
mongoose
  .connect(process.env.MongoURL)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

app.use("/api", userRouter);
module.exports = app;
