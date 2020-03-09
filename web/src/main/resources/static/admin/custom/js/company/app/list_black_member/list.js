$(document).ready(function () {
    let appId = $("#app_id").val();
    let columnDefinitions = [
        {"data": "memberCode", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "phone", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "birthday", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "createdTime", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "memberCode","orderable":false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
    ];
    let getUsers = function (requestData, renderFunction) {
        let sortField = columnDefinitions[requestData.order[0].column].data;
        let sortDir = requestData.order[0].dir;
        let params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": sortField,
            "sortDir": sortDir,
        };
        window.loader.show();
        jQuery.get("/api/v1/web/" + appId + "/member/listBlackMember", params, function (response) {
            let content = {
                "draw": requestData.draw,
                "recordsTotal": response.totalElements,
                "recordsFiltered": response.totalElements,
                "data": response.content
            };
            renderFunction(content);
            window.loader.hide();
        });
    };
    let listUsersTable = $("#table_black_member").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [10, 50, 100],
            [10, 50, 100]
        ],
        rowId: 'id',
        "ordering": true,
        "serverSide": true,
        "order": [0, "desc"],
        "searching": false,
        "columns": columnDefinitions,
        "ajax": function (data, callback) {
            getUsers(data, callback);
        },
        columnDefs : [
            {
                "render": function (data) {
                    return  '<button style="margin-left: 10px" data-id="'+data+'" data-toggle="modal" data-target="#modal_delete_black_member" class="btn btn-sm btn-danger btn_delete_member">削除</button>';
                },
                "targets": 4
            },
        ]

    });
})