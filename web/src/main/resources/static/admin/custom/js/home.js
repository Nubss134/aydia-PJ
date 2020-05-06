$(document).ready(function(){

    let columnDefinitions = [
        {"data": "image", "defaultContent": "データなし", "class": 'text-center' },
        {"data": "contentJpn", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "contentVi", "defaultContent": "データなし", "class": 'text-center'},
        {"data": null, "defaultContent": "データなし", "class": 'text-center'},
    ];

    let table = $("#home_table").DataTable({
            language: {
                "url": "/admin/libs/new_data_table/js/ja.json"
            },
            lengthMenu: [
                [3, 5, 6],
                [3, 5, 6]
            ],
            searching: false,
            serverSide: true,
            columns: columnDefinitions,
            ajax: function (requestParams, callback) {
                window.loader.show();
                let params = {
                    "page": (requestParams.start / requestParams.length) + 1,
                    "size": requestParams.length,
                };
                jQuery.get("/api/v1/home/getList", params, function (response) {
                    let data = response.content;
                    callback({
                        "draw": requestParams.draw,
                        "recordsTotal": response.totalElement,
                        "recordsFiltered": response.totalElement,
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
                        return '<button id="'+data.id+'" class="btn-responsive btn btn-sm btn-primary btn-detail" style="font-size: 12px; margin-left:5px; padding: 5px; width: 80px; height: 30px;" data-toggle="modal" data-target="#homeModal">' +
                        '詳しく見る</button>' +
                        '<button id="'+data.id+'" class="btn-responsive btn btn-danger btn-sm btn-delete" style="font-size: 12px; margin-left:5px; padding: 5px; width: 80px; height: 30px; margin-top: 3px;" data-toggle="modal" data-target="#deleteModal">' +
                        '削除</button>';
                    },
                    "targets": 3
                }

            ]

    });

    $(document).on("click", ".btn-detail", function(){
        $('#title_help').html("");
        $('#content_jpn_help').html("");
        $('#content_vi_help').html("");
        $('#image_help').html("");

        let id = $(this).attr("id");
        if(id == 0){
            $('#image_preview').addClass('hidden');
            $('#home_form')[0].reset();
        }
        else {
            $.ajax({
                url: '/api/v1/home/get?id='+id,
                type: 'GET',
                success: function (data) {
                    $('#id').val(data.id);
                    $('#title').val(data.title);
                    $('#content_JPN').val(data.contentJpn);
                    $('#content_VI').val(data.contentVi);
                    $('#url_image').val(data.image);
                    $('#image_preview').attr('src', data.image);
                    $('#image_preview').removeClass('hidden');
                }
            })
        }
    });



    $(document).on("click", ".btn-submit", function(){
           let home_item = {};
           $('#home_form').serializeArray().forEach(function(item){
                home_item[item.name] = item.value;
           });
           if(!validate(home_item)){
                return;
           }

           $.ajax({
                url: '/api/v1/home/saveOrUpdate',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(home_item),
                success: function(){
                    window.alert.show("success", "完成", 2000);
                    location.reload();
//                    console.log(home_item);
                },
                error: function(){
                    window.alert.show("error", "失敗", 2000);

                }
           })
    });

    function validate(home_item){
        if(home_item.title === ''){
            $('#title_help').html("タイトルを入力してください");
            return false;
        }else{
            $('#title_help').html("");
        }

        if(home_item.contentJpn === ''){
            $('#content_JPN_help').html("日本語で本文を入力してください");
            return false;
        }else{
            $('#content_JPN_help').html("");
        }

        if(home_item.contentVi === ''){
            $('#content_VI_help').html("ベトナム語で本文を入力してください");
            return false;
        }else{
            $('#content_VI_help').html("");
        }

        if(home_item.image === ''){
            $('#image_help').html("イメージを選択してください");
            return false;
        }else{
            $('#image_help').html("");
        }
        return true;
    }

    $(document).on("click", ".btn-delete", function () {
        let id = $(this).attr("id");//??
        $('.btn-confirm-delete').click(function () {
            $.ajax({
                url: '/api/v1/home/delete?id=' + id,
                type: 'POST',
                success: function(){
                    window.alert.show("success", "成功", 2000);
                    table.ajax.reload();
                },
                error: function(){
                    window.alert.show("error", "失敗", 2000);
                }
            })
        })

    });

    $('#image').change(function(){
        let formData = new FormData();
        let file = $('#image')[0].files[0];
        formData.append('file', file);
        $.ajax({
            url: '/api/v1/upload',
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success: function(res){
                $('#url_image').val(res);
                $('#image_preview').attr('src', res);
                $('#image_preview').removeClass('hidden');
            }

        })

    })
})