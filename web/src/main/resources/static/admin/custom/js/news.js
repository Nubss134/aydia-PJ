$(document).ready(function(){
    var contentEditor = CKEDITOR.replace( 'content' );
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

                     return '<button id="'+data.id+'" class="btn-responsive btn btn-sm btn-primary btn-detail" style="font-size: 12px; margin-left:5px; padding: 5px; width: 80px; height: 30px;" data-toggle="modal" data-target="#newsModal">' +
                     '詳しく見る</button>' +
                     '<button id="'+data.id+'" class="btn-responsive btn btn-danger btn-sm btn-delete" style="font-size: 12px; margin-left:5px; padding: 5px; width: 80px; height: 30px;　margin-top: 3px;" data-toggle="modal" data-target="#deleteModal">' +
                     '削除</button>';

                     },

                "targets": 3
            }
        ]

    });

    $(document).on("click", ".btn-detail", function(){

        $('#title_help').html("");
        $('#description_help').html("");
        $('#content_help').html("");
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
                    CKEDITOR.instances['content'].setData(data.content);
                    $('#url_image').val(data.image);
                    $('#image_preview').attr('src',data.image);
                    $('#image_preview').removeClass('hidden');
                }
            })
        }
    });

    $(document).on("click", ".btn-submit", function(){
        let news = {}
        $('#news_form').serializeArray().forEach(function(item){
            news[item.name] = item.value;
        });
        news.content = CKEDITOR.instances['content'].getData();
        if(!validate(news)){
            return;
        }

        $.ajax({
            url: '/api/v1/news/saveOrUpdate',
            type: 'POST',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(news),
            success: function(){
                window.alert.show("success", "完成", 2000);
                  location.reload();
            },
            error: function(){
                window.alert.show("error", "失敗", 2000)
            }
        })
        console.log(news);
    })

    function validate(news){
        if(news.title === ''){
            $('#title_help').html("タイトルを入力してください");
            return false;
        }
        else{
            $('#title_help').html("");
        }
        if(news.description === ''){
            $('#description_help').html("形容を入力してください");
            return false;
        }
        else{
            $('#description_help').html("");
        }
        if(news.content === ''){
            $('#content_help').html("本文を入力してください");
            return false;
        }
        else{
            $('#content_help').html("");
        }
        if(news.image ===''){
            $('#image_help').html("イメージを選択してください");
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
                    window.alert.show("success", "完成", 2000);
                    table.ajax.reload()
                },
                error: function(){
                    window.alert.show("error", "失敗", 2000)
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