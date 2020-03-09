let historyScreen = {};
$(document).ready(function () {
    let appId = $("#app_id").val();
    let columnDefinitions = [
        {"data": null, "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "creatorName", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "createdTime", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "importedTime", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "status", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "numberLine", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "numberUpdate", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "numberCreateNew", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "numberFail", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": null, "defaultContent": "<i>データなし</i>", "class": "text-center"},
    ];
    let getHistory = function (requestData, renderFunction) {
        let sortField = columnDefinitions[requestData.order[0].column].data;
        let sortDir = requestData.order[0].dir;
        let params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": sortField,
            "sortDir": sortDir,
            "keyword": $("#keyword_search").val().trim(),
        };
        jQuery.get("/api/v1/web/" + appId + "/kusuriMember/listHistoryImport", params, function (response) {
            let content = {
                "draw": requestData.draw,
                "recordsTotal": response.totalElements,
                "recordsFiltered": response.totalElements,
                "data": response.content
            };
            renderFunction(content);
        });
    };
    historyScreen.tableHistory = $("#history_table").DataTable({
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
        "order": [2, "desc"],
        "searching": false,
        "columns": columnDefinitions,
        "ajax": function (data, callback) {
            getHistory(data, callback);
        },
        columnDefs: [
            {
                "render": function (data) {
                    return '<div>' +
                        '<a class="download-file-history-import" id="imported_file" href="' + data.fileUrl + '" target="_blank">' + data.fileName + '</a>' +
                        '</div>';
                },
                "targets": 0
            },
            {
                "render": function (data) {
                    if (data === 1) {
                        return '<label class="badge badge-warning" style="padding: 5px;">取込中</label>';
                    } else {
                        return '<label class="badge badge-success" style="padding: 5px;">完了</label>';
                    }
                },
                "targets": 4
            },
            {
                "render": function (data) {
                    if (data.status === 1) {
                        return 'データなし';
                    } else {
                        return "<div>" +
                            "<a class='download-file-history-import' id='imported_file' href='/api/v1/web/" + appId + "/kusuriMember/downloadMemberImportSuccess/" + data.id + "' target='_blank'>インポート済み.csv</a>" +
                            "<br/>"+
                            "<a class='download-file-history-import' id='import_fail_file' href='/api/v1/web/" + appId + "/kusuriMember/downloadMemberImportFail/" + data.id + "' target='_blank'>インポート失敗.csv</a>" +
                            "</div>";
                    }

                },
                "targets": 9
            }
        ]
    });

});
    
   




    
