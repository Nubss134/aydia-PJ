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
        let id = $(this).attr("id");
        if(id == 0){
            $('#news_form')[0].reset();
        }
        else{
            $ajax({
                url: '/api/v1/news/get?id='+id,
                type: 'GET',
                success: function (data){
                    $('#id').val(data.id);
                    $('#title').val(data.title);
                    $('#description').val(data.description);
                }
            })
        }
    });

    $(document).on("click", ".btn-submit", function(){
        let news = {};
        news.id = $('#id').val();
        news.title = $('#title').val();
        news.description = $('#description').val();

        $.ajax({
            url: '/api/v1/news/saveOrUpdate',
            type: 'POST',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(news),
            success: function(){
                window.alert.show("success", "DONE", 2000);
                table.ajax.reload()
            },
            error: function(){
                window.alert.show("error", "FAIL", 2000)
            }
        })
    })

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





})