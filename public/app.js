$(document).ready(function() {
    
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


});