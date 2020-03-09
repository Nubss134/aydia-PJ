$(document).ready(function () {
    var appId = $("#app_id").val();
    var url = "/api/v1/web/" + appId + "/historyDownLoadFile/list";
    var format = "yyy/MM/dd";
    var getLists = function (requestData, renderFunction) {
        var sortField = columnDefinitions[requestData.order[0].column].data;
        var sortDir = requestData.order[0].dir;
        var startTime = ($("#start_time").val() === "") ? "1970/01/01" : $("#start_time").val();
        var endTime = ($("#end_time").val() === "") ? "9999/12/31" : $("#end_time").val();
        var params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": sortField,
            "sortDir": sortDir,
            "startTime": startTime,
            "endTime": endTime,
            "data": $("#keyword_search").val()
        };
        jQuery.get(url, params, function (response) {
            var content = {
                "draw": requestData.draw,
                "recordsTotal": response.totalElements,
                "recordsFiltered": response.totalElements,
                "data": response.content
            };
            renderFunction(content);
        });
    };

    var columnDefinitions = [
        {
            "data": "id",
            "class": "text-center",
            "orderable": false
        },
        {
            "data": "userEntity.name",
            "class": "text-center",
        },
        {
            "data": "nameFile",
            "defaultContent": ""
        },
        {
            "data": "appId",
            "class": "text-center"
        },
        {
            "data": "createdTime",
            "defaultContent": "Created Time"
        },
        {
            "data": "typeHistory",
            "class": "text-center"
        },
        {
            "data": "size",
            "class": "text-center"
        },
    ];

    var content_table = $("#content_table").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "columns": columnDefinitions,
        "lengthMenu": [
            [50, 100, 200],
            [50, 100, 200]
        ],
        rowId: 'id',
        "ordering": true,
        "serverSide": true,
        "order": [1, "desc"],
        "searching": false,
        "columns": columnDefinitions,
        "ajax": function (data, callback) {
            getLists(data, callback);
        },
        columnDefs: [
            {
                "render": function (data) {
                    return "<input class='check' type= 'checkbox' style='width: 15px; height: 15px' name='delete_history' value=" + data + "/>";
                },
                "targets": 0
            }
        ]
    });
    $("#check_all").click(function () {
        $('.check').attr('checked', this.checked);
    });

    $("#btn_delete_history").click(function () {
        var list = [];
        $.each($("input[name='delete_history']:checked"), function () {
            list.push($(this).val().split("/")[0]);
        });
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/v1/web/history/" + appId
                + "/delete?listId=" + list,
            error: function (xhr, ajaxOptions,
                             thrownError) {
            },
            success: function (response) {
                if (response.status.code == 2002) {
                    window.alert.show("success",
                        "Success", 1000);
                    setTimeout(function () {
                        location.reload();
                    }, 1200)
                } else {
                    window.alert.show("error",
                        "Fail", 2002);
                }
            }
        })
    });
    configDate('start_time');
    $("#start_time").val("");
    configDate('end_time');
    $("#end_time").val("");

    function configDate(idElement) {
        $("#" + idElement).daterangepicker({
            timePicker: false,
            singleDatePicker: true,
            autoApply: true,
            "timePicker24Hour": true,
            locale: {
                format: 'YYYY/MM/DD',
                cancelLabel: 'キャンセル',
                applyLabel: 'OK'
            }
        });
    }

    $("#end_time").on('change', function () {
        content_table.ajax.reload();
    })

    $("#start_time").on('change', function () {
        content_table.ajax.reload();
    })
    $("#search_now").click(function () {
        content_table.ajax.reload();
    });

    $("#keyword_search").on('change', function () {
        content_table.ajax.reload();
    })

})