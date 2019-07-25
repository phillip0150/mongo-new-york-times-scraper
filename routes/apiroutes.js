var mongojs = require("mongojs");
var db = require("../models");
module.exports = function(app){
    app.get("/api/save", function(req,res){
        console.log(req.query);
        db.Article.create(req.query)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    app.get("/api/delete/:id", function(req, res) {
        console.log("req.params.id: "+req.params.id);
        db.Article.remove({_id: req.params.id}, function(err){
            if(!err){
                console.log("notification!");
            }else{
                console.log("error");
            }
        });
      });

    app.get("/api/removeAll", function(req, res) {
        db.Article.remove({ }, function(err){
            if(!err){
                console.log("notification!");
            }else{
                console.log("error");
            }
        });
    });

    //route for grabbing a article by id and populate it with its note
    // app.get("/api/note/:id", function(req, res) {
    //     db.Article.findOne({ _id: req.params.id })
    //     // ..and populate all of the notes associated with it
    //     .populate("note")
    //     .then(function(dbArticle) {
    //     // If we were able to successfully find an Article with the given id, send it back to the client
    //     // res.json(dbArticle);
    //     console.log("note found");
    //     })
    //     .catch(function(err) {
    //     // If an error occurred, send it to the client
    //     res.json(err);
    //     });
    //   });

    app.post("/api/note/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
        console.log(req.body);
        db.Note.create(req.body)
        .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
        })
        .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
        });
    });
    

};