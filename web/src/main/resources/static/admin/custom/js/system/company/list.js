var companyId = $("#company_id").val();

function changeOverflowTable(media) {
    if (media.matches) {
        $(".dataTables_wrapper").addClass("overflow_table")
    } else {
        $(".dataTables_wrapper").removeClass("overflow_table")
    }
}

var media = window.matchMedia("(max-width: 1335px)")
media.addListener(changeOverflowTable)
var company = {};
$(document).ready(function () {
    var getCompanys = function (requestData, renderFunction) {

        var sortDir = requestData.order[0].dir;
        var params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": "createdTime",
            "sortDir": sortDir
        };
        window.loader.show();
        jQuery.get("/api/v1/web/company/list", params, function (response) {
            var content = {
                "draw": requestData.draw,
                "recordsTotal": response.totalElements,
                "recordsFiltered": response.totalElements,
                "data": response.content
            };
            renderFunction(content);
            window.loader.hide();
        });
    };
    var columnDefinitions = [
        {
            "data": "name",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        },
        {
            "data": "companyAuthId",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        },
        {
            "data": "address",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        },
        {
            "data": "phoneNumber",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        },
        {
            "data": "createdTime",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        },
        {
            "data": "companyAuthId",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        },
    ];

    company.companyTable = $("#company_table").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [10, 20, 50],
            [10, 20, 50]
        ],
        "searching": false,
        rowId: 'id',
        "ordering": true,
        "order": [4, "desc"],
        "pagingType": "full_numbers",
        "serverSide": true,
        "columns": columnDefinitions,
        "ajax": function (data, callback) {
            getCompanys(data, callback);
        },
        columnDefs: [
            {
                "render": function (data) {
                    return '<a href="/company/' + data + '/apps" class="btn btn-sm btn-primary" style="font-size: 12px;">' +
                        '<span>会社管理</span></a>' +
                        '<span data-toggle="tooltip" data-placement="top" title="Delete this company">' +
                        '<span id="' + data + '" class="btn btn-sm btn-danger"  ' +
                        'role="button" style="font-size: 12px; margin-left: 10px;" data-toggle="modal" data-target="#modal_delete_company">削除</span></span>';
                },
                orderable: false,
                "targets": 5
            },
        ],
    });
    $(document).on("click", ".btn-danger", function () {
        $("#company_id").val($(this).attr('id'))

    })

    $('#btn_submit_delete').on('click', function () {
        if ($("#delete-company-password").val() == null || $("#delete-company-password").val() == '') {
            window.alert.show("error", $("#password_empty").html(), 2000);
            return;
        } else {
            var companyId = $("#company_id").val()
            var data = {
                password: $("#delete-company-password").val()
            };
            $.ajax({
                type: "POST",
                url: "/api/v1/web/company/delete/" + companyId,
                data: data,
                beforeSend: function () {
                    window.loader.show();
                },
                success: function (response) {
                    console.log(response)
                    switch (response.status.code) {
                        case 2002: {
                            window.loader.hide();
                            window.alert.show("success", $("#delete_company_success").html(), "2000")

                            setTimeout(function () {
                                location.reload();
                            }, 2000);
                            break;
                        }
                        case 2005: {
                            window.loader.hide();
                            window.alert.show("error", $("#delete_company_failed").html(), "2000")
                            return;
                        }

                    }
                }
            })
        }
    })

})