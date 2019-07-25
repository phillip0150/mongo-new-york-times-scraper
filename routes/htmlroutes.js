// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
var mongojs = require("mongojs");


// Require all models
var db = require("../models");

module.exports = function(app) {

// Routes
// Main route (simple Hello World Message)
app.get("/", function(req, res) {
    res.render("index");
  });

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/section/technology").then(function(response) {
    
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);
      
        // An empty array to save the data that we'll scrape
        var results = [];
      
        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $(".css-ye6x8s").each(function(i, element) {
      
          var articleName = $(element).find("h2").text().trim();
          var articleSummary = $(element).find("p").text().trim();
          var shortURL = $(element).find("a").attr("href");
          var longURL = "https://www.nytimes.com/"+shortURL
          // Save these results in an object that we'll push into the results array we defined earlier
          results.push({
            articleName,
            articleSummary,
            longURL
          });
          
        });
        var hbsObject = {
          theResults: results
          };
        res.render("scrape", hbsObject);
        console.log("items scraped");
      
      });
  });
  
  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find({}).then(function(dbArticle){
      res.json(dbArticle);
    }).catch(function(err){
      console.log(err.message);
    })
  });

  app.get("/saved", function(req,res){
    db.Article.find({}).then(function(dbArticle){
        var hbsObject = {
            theResults: dbArticle
            };
        console.log(hbsObject);
        res.render("saved", hbsObject);
      }).catch(function(err){
        console.log(err.message);
      });
  
  });


  ////////////////////////////////////////////
  
  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
    // TODO
    // ====
    // Finish the route so it finds one article using the req.params.id,
    // and run the populate method with "note",
    // then responds with the article with the note included
    db.Article.findOne({_id: req.params.id})
    .populate("note")
    .then(function(dbNote){
      res.json(dbNote);
    })
    .catch(function(err){
      res.json(err);
    })
  });
  
  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id
    // and update it's "note" property with the _id of the new note
    db.Note.create(req.body)
    .then(function(dbNote){
    return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote.id})
    }).then(function(dbArticle){
      res.json(dbArticle);
    })
    .catch(function(err){
      res.json(err);
    });
    
  });

   app.get("/note/:id", function(req, res) {
     console.log(req.params.id);
    db.Note.find({_id:req.params.id}).then(function(dbnote){
      var hbsObject = {
          theNote: dbnote,
          theID: req.params.id
          };
      console.log(hbsObject);
      res.render("note", hbsObject);
    }).catch(function(err){
      console.log(err.message);
    });
        
      });
};