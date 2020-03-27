$(document).ready(function () {

    let columnDefinitions = [
        {"data": "image", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "name", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "position", "defaultContent": "データなし", "class": 'text-center'},
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

                        return '<img src="'+data+'"/>';

                    },

                    "targets": 0
                },
                {
                    "render": function (data) {

                        return '<button id="'+data.id+'" class="btn-responsive btn btn-sm btn-primary btn-detail" style="font-size: 12px; margin-left:5px; padding: 5px" data-toggle="modal" data-target="#teamModal">' +
                            'Detail</button>' +
                            '<button id="'+data.id+'" class="btn-responsive btn btn-danger btn-sm btn-delete" style="font-size: 12px; margin-left:5px; padding: 5px" data-toggle="modal" data-target="#deleteModal">' +
                            'Delete</button>';

                    },

                    "targets": 3
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
                    $('#position').val(data.position);
                    $('#detail').val(data.detail);
                    $('#url_image').val(data.image);
                    $('#image_preview').attr('src',data.image);
                    $('#image_preview').removeClass('hidden');
                }
            })
        }

    });

    $(document).on("click",".btn-submit",function () {
        let team = {}
        $('#team_form').serializeArray().forEach(function(item) {
            team[item.name] = item.value;
        });
        if(!validate(team)) {
            return;
        }

        $.ajax({
            url: '/api/v1/team/saveOrUpdate',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(team),
            success: function () {
                window.alert.show("success","Thành công",2000);
                location.reload();
            },
            error: function () {
                window.alert.show("error","Thất bại",2000)
            }
        })
    })

    function validate(team) {
        if(team.name === '') {
            $('#name_help').html("Please enter name");
            return false;
        } else {
            $('#name_help').html("");
        }

        if(team.position === '') {
            $('#position_help').html("Please enter position");
            return false;
        } else {
            $('#position_help').html("");

        }
        if(team.detail === '') {
            $('#detail_help').html("Please enter detail");
            return false;
        } else {
            $('#detail_help').html("");

        }
        if(team.image === '') {
            $('#image_help').html("Please choose image");
            return false;
        } else {
            $('#image_help').html("");
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
                    window.alert.show("success","Thành công",2000);
                    table.ajax.reload()
                },
                error: function () {
                    window.alert.show("error","Thất bại",2000)
                }
            })
        })

    })

    $('#image').change(function () {
        let formData = new FormData();
        let file = $('#image')[0].files[0];
        formData.append('file',file);
        $.ajax({
            url: '/api/v1/upload',
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success: function (res) {
                $('#url_image').val(res);
                $('#image_preview').attr('src',res);
                $('#image_preview').removeClass('hidden');
            }

        })
    })

});