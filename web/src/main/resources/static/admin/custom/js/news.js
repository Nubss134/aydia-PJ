$(document).ready(function(){

    let columnDefinitions = [
        {"data":"image", "defaultContent":"データなし", "class":'text-center'},
        {"data": "title", "defaultContent":"データなし", "class":'text-center'},
        {"data": "description", "defaultContent":"データなし", "class":'text-center'},
        {"data": null, "defaultContent": "データなし", "class": 'text-center'},
    ];

    let table = $("#news_table").DataTable({
        language: {
             "url": "/admin/libs/new_data_table/js/ja.json"
        },
        lengthMenu: [
              [3, 5, 10],
              [3, 5, 10]
        ],
        searching: false,
        serverSide: true,
        columns: columnDefinitions,
        ajax: function(requestParams, callback){
            window.loader.show();
            let params = {
                "page": (requestParams.start / requestParams.length) + 1,
                "size": requestParams.length,
             };
             jQuery.get("/api/v1/news/getList", params, function (response){
                let data = response.content;
                callback({
                    "draw": requestParams.draw,
                    "recordsTotal": response.totalElements,
                    "recordsFiltered": response.totalElements,
                    "data": data

                });
                window.loader.hide()
             });
        },
        columnDefs: [
            {
                 "render": function (data) {

                      return '<img src="'+data+'"/>';

                 },

                 "targets": 0
             },
            {
                "render": function (data) {

                     return '<button id="'+data.id+'" class="btn-responsive btn btn-sm btn-primary btn-detail" style="font-size: 12px; margin-left:5px; padding: 5px" data-toggle="modal" data-target="#newsModal">' +
                     'Detail</button>' +
                     '<button id="'+data.id+'" class="btn-responsive btn btn-danger btn-sm btn-delete" style="font-size: 12px; margin-left:5px; padding: 5px" data-toggle="modal" data-target="#deleteModal">' +
                     'Delete</button>';

                     },

                "targets": 3
            }
        ]

    });

    $(document).on("click", ".btn-detail", function(){

        $('#title_help').html("");
        $('#description_help').html("");
        $('#image_help').html("");

        let id = $(this).attr("id");
        if(id == 0){
            $('#image_preview').addClass('hidden');
            $('#news_form')[0].reset();
        }
        else{
            $.ajax({
                url: '/api/v1/news/get?id='+id,
                type: 'GET',
                success: function (data){
                    $('#id').val(data.id);
                    $('#title').val(data.title);
                    $('#description').val(data.description);
                    $('#url_image').val(data.image);
                    $('#image_preview').attr('src',data.image);
                    $('#image_preview').removeClass('hidden');
                }
            })
        }
    });

    $(document).on("click", ".btn-submit", function(){
        let news = {}
        console.log("hi")
        console.log($('#news_form').serializeArray())
        $('#news_form').serializeArray().forEach(function(item){
            news[item.name] = item.value;
        });
        console.log(news)
        if(!validate(news)){
            return;
        }

        $.ajax({
            url: '/api/v1/news/saveOrUpdate',
            type: 'POST',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(news),
            success: function(){
                window.alert.show("success", "DONE", 2000);
//                table.ajax.reload();
                  location.reload();
            },
            error: function(){
                window.alert.show("error", "FAIL", 2000)
            }
        })
        console.log(news);
    })

    function validate(news){
        if(news.title === ''){
            $('#title_help').html("Please enter title");
            return false;
        }
        else{
            $('#title_help').html("");
        }
        if(news.description === ''){
            $('#description_help').html("Please enter description");
            return false;
        }
        else{
            $('#description_help').html("");
        }
        if(news.image ===''){
            $('#image_help').html("Please choose image");
            return false;
        }
        else{
            $('#image_help').html("");
        }
        return true;
    }

    $(document).on("click", ".btn-delete", function(){
        let id = $(this).attr("id");
        $('.btn-confirm-delete').click(function(){
            $.ajax({
                url: '/api/v1/news/delete?id='+id,
                type: 'POST',
                success: function(){
                    window.alert.show("success", "DONE", 2000);
                    table.ajax.reload()
                },
                error: function(){
                    window.alert.show("error", "FAIL", 2000)
                }
            })
        })

    })

    $('#image').change(function(){
        let formData = new FormData();
        let file = $('#image')[0].files[0];//??
        formData.append('file', file);//??
        $.ajax({
            url: '/api/v1/upload',
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success: function(res){
                $('#url_image').val(res);
                $('#image_preview').attr('src',res);
                $('#image_preview').removeClass('hidden');
            }

        })
    })





});