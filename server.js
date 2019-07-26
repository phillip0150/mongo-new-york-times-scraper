require("dotenv").config();
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var exphbs = require("express-handlebars");




var PORT = 3000;

// Initialize Express
var app = express();



// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));



// Routes
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);
// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
    );
    
app.set("view engine", "handlebars");
// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/NYTScraper", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;