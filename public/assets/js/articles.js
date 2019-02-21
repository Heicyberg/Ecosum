$.getJSON("/savedArticles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append(
      "<div class ='articleSaved col-9'>"
      +"<a class='text-info' href='" + data[i].link +"'>"+"<h4>" + data[i].title+"</h4>"+ "</a>"
      +"</div>"
      +"<div class='col-3'>"
      +"<div class='row'>"
      +"<button type='button' class='col-5 btn btn-primary open' data-id='" + data[i]._id +"'> NOTE </button>"
      +"<button type='button' class='col-5 btn btn-danger delete' data-id='" + data[i]._id +"'> DELETE </button>"
      +"</div>"
      +"</div>"
      +"<break>"
      );
    }
  });


// Whenever clicks a note button
$("#articles").on("click", ".open", function() {
    // Empty the notes from the note section
   $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    console.log(thisId)
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'>notes:</textarea>");
      
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>SAVE</button>");
  
        // If there's a note in the article
        if (data.note) {
           console.log(data.note)
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }else{
          $("#bodyinput").append("<p>No notes taken yet</p>")
        }

      });
  });

// When click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });
  $("#bodyinput").val("");
});

// Whenever clicks the dellete button
$("#articles").on("click", ".delete", function(e) {
  e.preventDefault();
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/delete/" + thisId,
    data:null
  })

  window.location.href = "/saved"

});

  