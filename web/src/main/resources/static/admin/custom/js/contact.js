$(document).ready(function () {

    let columnDefinitions = [
        {"data": "sub", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "name", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "email", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "tel", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "createdTime", "defaultContent": "データなし", "class": 'text-center'},
        {"data": null, "defaultContent": "データなし", "class": 'text-center'},


    ];

    let table = $('#table_contact').DataTable({
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
            jQuery.get("/api/v1/contact/list", params, function (response) {
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

                    return '<button id="'+data.id+'" class="btn-responsive btn btn-sm btn-primary btn-detail" style="font-size: 12px; margin-left:5px; padding: 5px" data-toggle="modal" data-target="#contactModal">' +
                        'Detail</button>' +
                        '<button id="'+data.id+'" class="btn-responsive btn btn-danger btn-sm btn-delete" style="font-size: 12px; margin-left:5px; padding: 5px" data-toggle="modal" data-target="#deleteModal">' +
                        'Delete</button>';

                },

                "targets": 5
            }
        ],
        "createdRow": function (nRow, aData) {
            if(!aData.seen) {
                $(nRow).css({'font-weight': 'bold'});
            }
        }
    });

    $(document).on('click','.btn-detail',function () {
        window.loader.show();
        let id = $(this).attr('id');
        $.ajax({
            url: '/api/v1/contact/'+id,
            type: 'GET',
            success: function (contact) {
                table.ajax.reload();
                $('.subject').html(contact.sub);
                $('.name').html(contact.name);
                $('.email').html(contact.email);
                $('.time').html(contact.createdTime);
                $('.message').html(contact.message);
                window.loader.hide();
            }
        })
    })
})