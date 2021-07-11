    const env = require("dotenv").config();
    const express = require("express");
    const bodyParser = require("body-parser");
    const ejs = require("ejs");
    const mongoose = require("mongoose");
    const _ = require("lodash");


    // You can put your own content here: 

    // const homeStartingContent = "Your home Content"
    // const aboutContent = "Your about Content"
    // const contactContent = "Your contact info"

    const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac .";
    const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non di.";
    const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibe";

    const app = express();

    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static("public"));

       mongoose.connect("mongodb+srv://process.env.ADMIN_DBNAME:process.env.MONGO_KEY@cluster0.paw24.mongodb.net/DBName", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

       const postSchema = {
             title: String,
             content: String
       };

       const Post = mongoose.model("post", postSchema);

       const dataSchema = {
              name: String,
              email: String,
              phone: Number,
              message: String
       }

       const Data = mongoose.model("userData", dataSchema);

    app.get("/", function (req, res) {

        Post.find({}, function(err, posts){

            res.render("home", {

               startingContent: homeStartingContent,
               posts: posts
            });
        });
    });

    app.get("/compose", function (req, res) {

         res.render("compose");
    });

    app.post("/compose", function (req, res) {

        const post = new Post({

            title: req.body.postTitle,
            content: req.body.postBody

        });
        post.save(function(err){

             if (!err){
                 res.redirect("/");
             }
        });
    });

    app.get("/posts/:postId", function (req, res) {

        const requestedpostId = req.params.postId;

        Post.findOne({_id: requestedpostId}, function (err, post) {
             res.render("post", {

                 title: post.title,
                 content: post.content,
             });
        });
    });

//888*********--> Or It can be Done using a For loop as well************888

  // for (var i = 0; i < posts.length; i++) {
  //           if(posts[i].postTitle === posturl){
  //             console.log("Match Found !");
  //           }
  //     }

    app.get("/about", function (req, res) {

         res.render("about", {about: aboutContent});
    });

    app.get("/failure", function (req, res) {

         res.render("failure");
    });

    app.post("/failure", function (req, res) {

         res.redirect("/");
    });

    app.get("/success", function (req, res) {

         res.render("success");
    });

    app.post("/success", function (req, res) {

        const userData = new Data({

             name: req.body.userName,
             email: req.body.userEmail,
             phone: req.body.userPhone,
             message: req.body.userMessage
        });
        userData.save(function(err){

             if (!err){
                 res.redirect("/contact");
             }
        });
    });

    app.get("/contact", function (req, res) {

         res.render("contact", {contact: contactContent});
    });

    app.post("/contact", function(req, res){

        const userData = new Data({

             name: req.body.userName,
             email: req.body.userEmail,
             phone: req.body.userPhone,
             message: req.body.userMessage
        });
        userData.save(function(err){

             if (!err){

                 res.redirect("/success");
             }else{

                 res.redirect("/failure");
             }
        });
    });

    let port = process.env.PORT;
    if (port == null || port == "") {
         port = 3000;
    }
    app.listen(port, function() {

         console.log("Server started Successfully");
    });
