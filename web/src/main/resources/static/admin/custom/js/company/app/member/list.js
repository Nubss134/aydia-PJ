let listHistoryImport = {};
$(document).ready(function () {
    let activeTabRegister = function () {
        $(".tab-register").addClass("tab-active");
        $("#tab_register").removeClass("hidden");
        $(".tab-history").removeClass("tab-active");
        $("#tab_history").addClass("hidden");
    };
    listHistoryImport.activeTabHistory = function () {
        $(".tab-history").addClass("tab-active");
        $("#tab_history").removeClass("hidden");
        $(".tab-register").removeClass("tab-active");
        $("#tab_register").addClass("hidden");
    };
    $(".tab-member").on('click', function () {
        if ($(this).hasClass("tab-register")) {
            activeTabRegister();
        } else {
            listHistoryImport.activeTabHistory();
        }
    });

    let appId = $("#app_id").val();
    let columnDefinitions = [
        {"data": "memberCode", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "appMember", "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "birthday", "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "oldBirthday", "defaultContent": "<i>データなし</i>", "class": "text-center"},
    ];
    let getUsers = function (requestData, renderFunction) {
        let sortField = columnDefinitions[requestData.order[0].column].data;
        let sortDir = requestData.order[0].dir;
        let params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": sortField,
            "sortDir": sortDir,
            "keyword": $("#keyword_search").val().trim(),
        };
        window.loader.show();
        jQuery.get("/api/v1/web/" + appId + "/kusuriMember/list", params, function (response) {
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
    let listUsersTable = $("#member_table").DataTable({
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
        columnDefs: [
            {
                "render": function (isAppMember) {
                    if (isAppMember) {
                        return "<span class='dot'></span>";
                    } else {
                        return "<b style='color : red;font-size: 16px'>X</b>";
                    }
                },
                "targets": 1
            }
        ]
    });
    $("#search_now").on('click', function () {
        listUsersTable.ajax.reload();
    });

    $(document).on('click', "#check_all", function () {
        if (this.checked) {
            $(".checkbox-user").prop("checked", true);
        } else {
            $(".checkbox-user").prop("checked", false);
        }
    });

    $("#download_member_code").on('click', function () {
        window.open("/api/v1/web/" + appId + "/kusuriMember/downloadMember", '_blank');
    });


});
    
   




    
