
var listManagerTable;
$(document).ready(function () {
    $(document).on('click', "#checkbox_select_all", function () {
        if (this.checked) {
            $(".check-box-manager").prop("checked", true);
        } else {
            $(".check-box-manager").prop("checked", false);
        }
    });
    $(document).on('click', ".open_pop_up_delete", function () {
        $("#btn_accept_delete").val(this.value);
    });

    $(document).on('click', "#btn_accept_delete", function () {
        var listUserId = [];
        if (this.value === undefined || this.value == "") {
            $(".check-box-manager").each(function () {
                if (this.checked) {
                    listUserId.push(this.value);
                }
            });
        } else {
            listUserId.push(this.value);
        }

        if (listUserId.length < 1) {
            window.alert.show("error", "メーカを選択してください。。", "1200");
            return;
        }
        $.ajax({
            type: "GET",
            url: "/api/v1/web/user/delete?userIds=" + listUserId.toString(),
            success: function () {
                window.alert.show("success", "削除しました。", "1200");
                $("#modal_delete_manager").modal("hide");
                listManagerTable.ajax.reload();
            }
        })
    });

    var getManagers = function (requestData, renderFunction, link_api) {

        var sortDir = requestData.order[0].dir;
        var params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": "createdTime",
            "sortDir": sortDir,
            "search": $("#search_manager_id").val(),
        };
        window.loader.show();
        jQuery.get(link_api, params, function (response) {
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
            "data": "id",
            "orderable": false,
            "defaultContent": "",
            "class": 'text-center'
        },
        {
            "data": "companyEntity.name",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        },
        {
            "data": "name",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        },
        {
            "data": "email",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        },
        {
            "data": "phone",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        },
        {
            "data": "createdTime",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        }, {
            "data": "statusUser",
            "orderable": false,
            "defaultContent": "<i>" + $("#no_data").html() + "</i>",
            "class": 'text-center'
        }, {
            "data": "id",
            "orderable": false,
            "defaultContent": "",
            "class": 'text-center'
        }
    ];
    listManagerTable = $("#manager_table").DataTable({
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
        "order": [1, "desc"],
        "pagingType": "full_numbers",
        "serverSide": true,
        "columns": columnDefinitions,
        "ajax": function (data, callback) {
            getManagers(data, callback, "/api/v1/web/user/listCompanyAdmin");
        },
        columnDefs: [
            {
                "render": function (data) {
                    return '<button type="button"  data-toggle="modal" data-target="#modal_add_manager" value="' + data + '" class="btn btn-sm btn-primary detail_manager">詳細</button>'
                        + '<button style="margin-left: 10px" data-toggle="modal" data-target="#modal_delete_manager" class="btn btn-sm btn-danger open_pop_up_delete" value="' + data + '">削除</button>';
                },
                "targets": 7
            },
            {
                "render": function (data) {
                    if (data == 'ACTIVE') {
                        return '<button disabled class="btn btn-sm btn-success " >有効</button>';

                    } else {
                        return '<button disabled class="btn btn-sm btn-secondary" >無効</button>';

                    }
                },
                "targets": 6
            },
            {
                "render": function (data) {
                    return '<input type="checkbox" style=" zoom:1.5;" value="' + data + '" class="check-box-manager"/>'
                },
                "targets": 0
            }
        ]
    });
    $(document).on('click', "#btn_search_manager", function () {
            listManagerTable.ajax.reload();
    })

    listManagerTable.on('draw', function () {
        $("#manager_table_length").parent().addClass('col-md-2')
    })
})