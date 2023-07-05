const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ dest: 'uploads/' });

mongoose.connect("mongodb+srv://abhiramjayakumar8:oPQvlcbiSlgM6BV1@cluster0.b6oikaq.mongodb.net/title");

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Create a data schema
const titleSchema = new mongoose.Schema({
  ResName: String,
  Loc: String,
  Course: String,
  OtherCourse: String,
  Amount: String,
  OtherAmount: String,
  Image: String
});

const Title = mongoose.model('Title', titleSchema);

// Define routes
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/data", function (req, res) {
  Title.find({})
    .then(data => {
      res.render("data", { data: data });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

app.post("/", upload.single('Image'), function (req, res) {
  let newNote = new Title({
    ResName: req.body.ResName,
    Loc: req.body.Loc,
    Course: req.body.Course,
    OtherCourse: req.body.OtherCourse,
    Amount: req.body.Amount,
    OtherAmount: req.body.OtherAmount,
    Image: req.file.filename // Save the filename of the uploaded image
  });

  newNote.save()
    .then(() => {
      res.redirect('/data');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
