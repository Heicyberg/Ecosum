// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<div class ='row articleModule'>"+
    "<a class='col-11'  href='" + data[i].link +"'>"+"<h4 class='text-info'>" + data[i].title+"</h4>"+ "</a>"
    +"<button type='button' class='col-1 btn btn-primary float-right' data-id='" + data[i]._id +" 'style='float: right;'>" +"Save"+ "</button>"
    +"</div>"+"<break>"
    );
  }
});

// When you click the save article button
$("#articles").on("click", "button", function(e) {
  e.preventDefault();
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/save/" + thisId,
    data:null
  })

});





