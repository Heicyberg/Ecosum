$.getJSON("/savedArticles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append(
      "<div class ='articleSaved col-10'>"
      +"<a class='text-info' href='" + data[i].link +"'>"+"<h4>" + data[i].title+"</h4>"+ "</a>"
      +"</div>"
      +"<div class='col-2'>"
      +"<div class='row'>"
      +"<button type='button' class='col-5 mr-1 btn btn-primary open' data-id='" + data[i]._id +"'> NOTE </button>"
      +"<button type='button' class='col-5 mr-1 btn btn-danger delete' data-id='" + data[i]._id +"'> DELETE </button>"
      +"</div>"
      +"</div>"
      +"<break>"
      );
    }
  });


// Whenever someone clicks a note button
$("#articles").on("click", "button", function() {
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
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
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
  