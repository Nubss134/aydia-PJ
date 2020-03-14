$(document).ready(function(){

//    function getID () {
//        $.ajax({
//            url:"/api/v1/about/getAll",
//            type: "GET",
//            success: function(result) {
//                $('#id').val(result[0].id)
//            }
//        })
//    }
//
//    getID();

    $("#submit").click(function(){
        let title = $("#title_id").val();
        let description = $("#description_id").val();
        let data = {

        }
        data.title = title;
        data.description = description;
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