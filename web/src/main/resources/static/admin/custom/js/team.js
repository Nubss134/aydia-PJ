$(document).ready(function () {
    var contentEditor = CKEDITOR.replace( 'detail' );

    let columnDefinitions = [
        {"data": "name", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "detail", "defaultContent": "データなし", "class": 'text-center'},
        {"data": null, "defaultContent": "データなし", "class": 'text-center'},
    ];

    let table = $("#team_table").DataTable({
            language: {
                "url": "/admin/libs/new_data_table/js/ja.json"
            },
            lengthMenu: [
                [10, 20, 50],
                [10, 20, 50]
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
                jQuery.get("/api/v1/team/getList", params, function (response) {
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

                        return '<button id="'+data.id+'" class="btn-responsive btn btn-sm btn-primary btn-detail" style="font-size: 12px; margin-left:5px; padding: 5px; width: 80px; height: 30px;" data-toggle="modal" data-target="#teamModal">' +
                            '詳しく見る</button>' +
                            '<button id="'+data.id+'" class="btn-responsive btn btn-danger btn-sm btn-delete" style="font-size: 12px; margin-left:5px; padding: 5px; width: 80px; height: 30px;　margin-top: 3px;" data-toggle="modal" data-target="#deleteModal">' +
                            '削除</button>';

                    },

                    "targets": 2
                }
            ]
        });


    $(document).on("click",".btn-detail",function () {

        $('#name_help').html("");
        $('#position_help').html("");
        $('#detail_help').html("");
        $('#image_help').html("");

        let id = $(this).attr("id");
        if(id == 0) {
            $('#image_preview').addClass('hidden');
            $('#team_form')[0].reset();
        }
        else {
            $.ajax({
                url: '/api/v1/team/get?id='+id,
                type: 'GET',
                success: function (data) {
                    $('#id').val(data.id);
                    $('#name').val(data.name);
                    CKEDITOR.instances['detail'].setData(data.detail);
                }
            })
        }

    });

    $(document).on("click",".btn-submit",function () {
        let team = {};
        $('#team_form').serializeArray().forEach(function(item) {
            team[item.name] = item.value;
        });
        team.detail = CKEDITOR.instances['detail'].getData();


        if(!validate(team)) {
            return;
        }

        $.ajax({
            url: '/api/v1/team/saveOrUpdate',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(team),
            success: function () {
                window.alert.show("success","完成",2000);
                location.reload();
            },
            error: function () {
                window.alert.show("error","失敗",2000)
            }
        })
    });

    function validate(team) {
        if(team.name === '') {
            $('#name_help').html("お名前を入力してください");
            return false;
        } else {
            $('#name_help').html("");
        }

        if(team.detail === '') {
            $('#detail_help').html("説明文を入力してください");
            return false;
        } else {
            $('#detail_help').html("");

        }

        return true;
    }

    $(document).on("click",".btn-delete",function () {
        let id = $(this).attr("id");
        $('.btn-confirm-delete').click(function () {
            $.ajax({
                url: '/api/v1/team/delete?id='+id,
                type: 'GET',
                success: function () {
                    window.alert.show("success","完成",2000);
                    table.ajax.reload()
                },
                error: function () {
                    window.alert.show("error","失敗",2000)
                }
            })
        })

    });

    $.ajax({
        url: '/api/v1/guest/company/get',
        type: 'GET',
        success: function (res) {
            if(res == null) {
                return
            }
            $('#company_id').val(res.id)
            $('#company_name').val(res.name);
            $('#e_name').val(res.eName);
            $('#representation').val(res.representation);
            $('#establishment').val(res.establishment);
            $('#address').val(res.address);
        }
    })

    $('.btn-company').click(function () {
        let company = {};
        $('#company_form').serializeArray().forEach(function (item) {
            company[item.name] = item.value;
        })
        $.ajax({
            url:'/api/v1/admin/company/saveOrUpdate',
            type:'POST',
            contentType: 'application/json',
            data: JSON.stringify(company),
            success: function () {
                window.alert.show("success","完成",2000);
                setInterval(function () {
                    location.reload();
                },2000)
            },
            error: function () {
                window.alert.show("error","失敗",2000)
            }
        })
    })







});