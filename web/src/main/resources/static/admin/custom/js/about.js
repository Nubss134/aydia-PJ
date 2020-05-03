$(document).ready(function(){

   var contentEditor = CKEDITOR.replace( 'description' );

    function getData () {
        $.ajax({
            url:"/api/v1/about/getAll",
            type: "GET",
            success: function(result) {
            console.log(result);
                $("#id").val(result[0].id);
                $("#title").val(result[0].title);
                CKEDITOR.instances['description'].setData(result[0].description);

            }
        })
    }

    getData();

    $("#submit").click(function(){

        let data = { }
        data.title = $("#title").val();
        data.description = CKEDITOR.instances['description'].getData();
        if(!validate(data)){
            return;
        }
        $.ajax({
            url:"/api/v1/about/getAll",
            type: "GET",
            success: function(result) {
                data.id = result[0].id;
                $.ajax({
                    url:"/api/v1/about/update",
                    type:"POST",
                    contentType:"application/json",
                    data: JSON.stringify(data),
                    success: function(data) {
                        console.log(data);
                    },
                    error: function(){
                     console.log("loi!");
                    }
                })
            }
        })

    })

    function validate(obj){
        if(obj.title === ''){
            $('#title_help').html("タイトルを入力してください");
            return false;
        }
        else{
            $('#title_help').html("");
        }

        if(obj.description === ''){
            $('#description_help').html("本文を入力してください");
            return false;
        }
        else{
            $('#description_help').html("");
        }
        return true;
    }


})


//$(document).ready(function(){
//
//    $("submit").click(function(){
//        let title = $("#title_id").val();
//        let description = $("#description_id").val();
//        let data = {
//
//        }
//        data.title = title;
//        data.description = description;
//        $.ajax({
//            url:"/api/v1/about/update",
//            type: "POST",
//            contentType:"application/json",
//            data: JSON.stringify(data),
//            success: function(){
//                console.log(data);
//            },
//            error: function(){
//                console.log("loi!");
//            }
//        })
//    })
//})