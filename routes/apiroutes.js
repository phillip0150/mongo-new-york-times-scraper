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

};