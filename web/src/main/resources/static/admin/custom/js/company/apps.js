let company = {};
$(document).ready(function () {
    let companyId = $("#company_id").val();
    let isSystemAdmin = $("#input_role").val();
    let getApps = function (requestData, renderFunction) {
        let sortDir = requestData.order[0].dir;
        let params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": "createdTime",
            "sortDir": sortDir
        };

        jQuery.get("/api/v1/web/company/" + companyId + "/app/list", params, function (response) {
            let content = {
                "draw": requestData.draw,
                "recordsTotal": response.totalElements,
                "recordsFiltered": response.totalElements,
                "data": response.content
            };
            renderFunction(content);
        });
    };
    let columnDefinitions = [
        {"data": "company.name", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "name", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "iconUrl", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "createdTime", "defaultContent": "データなし", "class": 'text-center'},
        {"data": "appAuthId", "defaultContent": "データなし", "class": 'text-center'}
    ];

    company.companyTable = $("#app_table").DataTable({
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
        "serverSide": true,
        "columns": columnDefinitions,
        "ajax": function (data, callback) {
            getApps(data, callback);
        },
        columnDefs: [
            {
                "render": function (data) {
                    return "<div><img style='width: 50px; height: 50px;' src='" + data + "' alt=''/></div>"
                },
                "targets": 2
            },
            {
                "render": function (data) {
                    if (isSystemAdmin !== "true") {
                        return '<a href="/company/' + companyId + '/app/' + data + '/config/sliderImages" class="btn-responsive btn btn-sm btn-primary btn-home" style="font-size: 12px; margin-left:5px; padding: 5px">' +
                            '<span>アプリメニュー</span></a>';
                    } else {
                        return '<a href="/company/' + companyId + '/app/' + data + '/config/sliderImages" class="btn-responsive btn btn-sm btn-primary btn-home" style="font-size: 12px; margin-left:5px; padding: 5px">' +
                            '<span>アプリメニュー</span></a>' +
                            '<a href="/company/' + companyId + '/app/' + data + '/config/info" class="btn-responsive btn btn-success btn-sm btn-config" style="font-size: 12px; margin-left:5px; padding: 5px">' +
                            '<span>システム管理App</span></a>';
                    }
                },
                "targets": 4
            }
        ]
    });

    $('#add_app').on('click', function () {
        $.ajax({
            type: "POST",
            url: "/api/v1/web/company/" + companyId + "/app/add",
            beforeSend: function () {
                window.loader.show();
            },
            success: function (response) {
                $("#modal_add_app").modal("hide");
                window.location.href = "/company/" + companyId + "/app/" + response + "/config/sliderImages";
            }
        })
    })

});