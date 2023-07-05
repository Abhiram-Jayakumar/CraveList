const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://abhiramjayakumar8:oPQvlcbiSlgM6BV1@cluster0.b6oikaq.mongodb.net/title")

//create a data schema

const titleSchema ={
    ResName:String,
    Loc:String,
    Course:String,
    OtherCourse:String,
    Amount:String,
    OtherAmount:String,
    Image:String

}

const Title = mongoose.model('Title',titleSchema);



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    let newNote= new Title({
        ResName:req.body.ResName,
        Loc: req.body.Loc,
        Course:req.body.Course,
        OtherCourse: req.body.OtherCourse,
        Amount:req.body.Amount,
        OtherAmount: req.body.OtherAmount,
        Image: req.body.Image
    })
    newNote.save();
    res.redirect('/');
})

app.listen(3000,function(){
    console.log("server is running on 3000")
})