$(document).ready(function(){
    $("#submit").click(function(){
        let title = $("#news_title").val();
        let description = $("#news_description").val();
        let data = {

        }
        data.title = title;
        data.description = description;
        $.ajax({
            url: "/api/v1/news/saveOrUpdate",
            type: "POST",
            contentType:"application/json",
            data: JSON.stringify(data),
            success: function(data){
                console.log(data);
            },
            error: function(){
                console.log("loi!!!");
            }

        })
    })
})