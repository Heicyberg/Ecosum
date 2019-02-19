var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var rp = require("request-promise");

var PORT = 3000;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/ecosum", { useNewUrlParser: true })
        .catch(function(err){
                 console.log(Error)
                 console.log("Mongo DB error")
               });



// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/data-routes.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
