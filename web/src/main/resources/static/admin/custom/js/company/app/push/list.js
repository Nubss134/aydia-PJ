var pushNotificationTable = {};
$(document).ready(function () {

    var columnDefinitions = [
    	{
            "data": "id",
            "orderable": false,
            "class": "text-center vertical-middel"
        }
    	,
        {
            "data": "pushTime",
            "orderable": true,
            "class": "text-center time-cell vertical-middel",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": null,
            "orderable": false,
            "class": "title-cell vertical-middel",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "toNumberUser",
            "orderable": true,
            "class": "text-center vertical-middel",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "numberReadUnique",
            "orderable": true,
            "class": "text-center vertical-middel",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "numberMemberUnique",
            "orderable": true,
            "class": "text-center vertical-middel",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "numberNotMemberUnique",
            "orderable": true,
            "class": "text-center vertical-middel",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "statusPush",
            "orderable": true,
            "class": "text-center vertical-middel",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "id",
            "orderable": false,
            "class": "text-center vertical-middel",
            "defaultContent": "<i>データなし</i>"
        },
    ];

    var appId = $("#app_id").val();
    pushNotificationTable = $("#push_notification_table").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [10, 20, 50],
            [10, 20, 50]
        ],
        "rowId": 'id',
        "ordering": true,
        "order": [1, "desc"],
        "serverSide": true,
        "bFilter": false,
        "bInfo": true,
        "bLengthChange": true,
        "columns": columnDefinitions,

        "ajax": function (requestParams, callback) {

            var sortField = columnDefinitions[requestParams.order[0].column].data;
            var sortDir = requestParams.order[0].dir;
            var params = {
                "page": (requestParams.start / requestParams.length) + 1,
                "size": requestParams.length,
                "sortField": sortField,
                "sortDir": sortDir,
            };
            window.loader.show();
            $.get("/api/v1/web/" + appId + "/pushNotification/list", params, function (response) {
                callback({
                    "draw": requestParams.draw,
                    "recordsTotal": response.totalElements,
                    "recordsFiltered": response.totalElements,
                    "data": response.content
                });
                window.loader.hide();
            });
        },

        columnDefs: [
        	{
        		"render": function(data) {
        			 return "<input class='check' type= 'checkbox' style='width: 15px, height: 15px' name='reload_data' value="+data+">";
				},
				"targets": 0
        	}
        	,
            {
                "render": function (noti) {
                    var cell = noti.title;
                    if (!noti.linkWebview) {
                        if (noti.imageUrl != undefined && noti.imageUrl != '') {
                            cell = "<div class=''><img src='" + noti.imageUrl + "' class=''><p style='padding-top:4%'>" + noti.title + "</p></div>";
                        }
                    }
                    return cell;
                },
                "targets": 2
            },
            {
                "render": function (data) {
                    switch (data) {
                        case "SUCCESS":
                            return '<span class="text-center" style="color:#ffffff;padding:5px; background-color:#28a745;font-weight:bold; border-radius:5px;">成功</span>';
                            break;
                        case "PENDING":
                            return '<span class="text-center" style="color:#ffffff;padding:5px; background-color:#ffc107;font-weight:bold; border-radius:5px;">保留中</span>';
                            break;
                        case "FAIL":
                            return '<span class="text-center" style="color:#ffffff;padding:5px; background-color:#dc3545;font-weight:bold; border-radius:5px;">失敗</span>';
                            break;
                        default:
                            break;
                    }

                },
                "targets": 7
            },
            {
                "render": function (id) {
                    return '<button style="margin-right: 5px;" class="btn btn-primary btn-sm btn-view" id="btn_view_' + id + '" data-id="'+ id + '"data-toggle="modal" data-target="#modal_add_push_notification" >詳細</button>' +
                        '<button style="margin-right: 5px;" class="btn btn-primary btn-sm btn-download-member-read" id="btn_download_member_read_' + id + '" >ダウンロード</button>' +
                        '<button class="btn btn-danger btn-sm btn-delete" id="btn_delete_' + id + '" data-id="'+ id + '" data-toggle="modal" data-target="#delete_push_modal" >削除</button>';
                },
                "targets": 8
            }
        ],
        "drawCallback": function () {
            $(".btn-view").click(function () {
                var id = $(this).data("id");
                $.get("/api/v1/web/" + appId + "/pushNotification/detailWeb/" + id, {}, function (response) {
                    //AddPushNotification.pushNotifiationVue.resetForm();
                    AddPushNotification.pushNotifiationVue.updateForm(response);
                });
            });

            $(".btn-download-member-read").click(function () {
                var pushId = $(this).attr("id").replace("btn_download_member_read_","");
                var href = "/api/v1/web/" + appId + "/pushNotification/downloadMemberReadPushNotificationCSV/" + pushId;
                window.location.href = href;
            });

            $(".btn-delete").click(function () {
                var id = $(this).data("id");
                $("#btn_submit_delete").on('click',function(){
                    $.post("/api/v1/web/" + appId + "/pushNotification/delete/" + id, {}, function () {
                        window.alert.show("success", "削除しました。", 1000);
                        setTimeout(function () {
                            location.reload()
                        },1000)
                    });
                })
            });
        }
    });
});
