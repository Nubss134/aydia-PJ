$(document).ready(function(){

    var contentEditor = CKEDITOR.replace( 'content' );
    function getData(){
        $.ajax({
            url: "/api/v1/business/getAll",
            type: "GET",
            success: function(result){
                $("#id").val(result[0].id);
                $("#title").val(result[0].title);
                CKEDITOR.instances['content'].setData(result[0].content);
            }
        })
    }
    getData();

    $("#submit").click(function(){

        let data ={}

        data.title = $("#title").val();
        data.content = CKEDITOR.instances['content'].getData();
        $.ajax({
            url: "/api/v1/business/getAll",
            type: "GET",
            success: function(result){
                data.id = result[0].id;
                $.ajax({
                    url: "/api/v1/business/update",
                    type: "POST",
                    contentType:"application/json",
                    data: JSON.stringify(data),
                    success: function(data){
                        console.log(data);
                    },
                    error: function(){
                        console.log("loi!!");
                    }
                })
            }
        })
    })
})