var navBar = false;
$("#navMenu").hide();
// $(document).ready(function() {
    
    $(".saved").on("click",function(){
        
        var title = $(this).attr("article-title");
        var summary = $(this).attr("article-summary");
        var url = $(this).attr("long-url");
        var savedArticle = {
            title: title,
            summary: summary,
            link: url
        };
        $.ajax("/api/save", {
            type: "GET",
            data: savedArticle
        });
        window.location.reload();
    });

    $(".delete-article").on("click",function(){
    
        var title = $(this).attr("article-title");
        var summary = $(this).attr("article-summary");
        var url = $(this).attr("long-url");
        var id = $(this).attr("article-id");
        var deleteArticle = {
            _id: id,
            title: title,
            summary: summary,
            longURL: url
        };
        $.ajax("/api/delete/"+id, {
            type: "GET",
            data: deleteArticle
        });
        window.location.reload();

    });

    $("#delete-saved").on("click",function(){

        $.ajax("/api/removeAll", {
            type: "GET",
        });
        window.location.reload();

    });

    $(".theNote").on("click",function(){
        var theModal = $(this).attr("article-id");
        $("#"+theModal).toggleClass("is-active");

    });

    $(".delete").on("click",function(){
        var theModal = $(this).attr("article-id");
        $("#"+theModal).toggleClass("is-active");
    });

    $(".navbar-burger").click(function(){
        if(navBar===false){
            $(".navbar-burger").toggleClass("is-active");
            $(".navbar-menu").toggleClass("is-active");
            navBar = true;
        }
        else if(navBar===true){
            $(".navbar-burger").toggleClass("is-active");
            $(".navbar-menu").toggleClass("is-active");
            navBar = false;
        }

    });

    $(document).on("click", ".is-success", function(){
        
        var id = $(this).attr("article-id");
        console.log(id);
        var textArea = document.getElementById("noteText").value;
        console.log("textarea:" + textArea)
        var addNote = {
            title: $("#noteTitle").val(),
            body: textArea
        };
        $.ajax("/api/note/"+id, {
            type: "POST",
            data: addNote
        });
        
        window.location.reload();
    });



$(document).on("click", ".viewNote", function(){
// Empty the notes from the note section
    var theModal = $(this).attr("article-id");
    $("#"+theModal).toggleClass("is-active");
  // Save the id from the p tag
  var thisId = $(this).attr("article-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
    
      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#noteTitle").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#noteText").val(data.note.body);
      }
    });

});

// });