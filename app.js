const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose= require ("mongoose");
const md5 = require("md5")

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const secret = "ini ADALAH rAHasiA";

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("index");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", function(req,res){
  const username = req.body.username;
  const password = md5(req.body.password);

  User.findOne({email:username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser){
        if (foundUser.password === password)
        res.render("index");
      }
    }
});
});



app.get("/register", function(req, res){
  res.render("login");
});

app.post("/register", function (req, res) {
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
});

newUser.save(function (err) {
  if (err) {
    console.log(err)
  } else {
    res.render("index")
  }
 });
});

app.get("/booking", function(req, res){
  res.render("booking");
});

app.get("/profile", function(req, res){
  res.render("profile");
});

app.get("/hargapaket", function(req, res){
  res.render("hargapaket");
});

app.get("/index", function(req, res){
  res.render("index");
});




app.listen(3000, function () {
  console.log("Server berjalan pada port 3000")
});
