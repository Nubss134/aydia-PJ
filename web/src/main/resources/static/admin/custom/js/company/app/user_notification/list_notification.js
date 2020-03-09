let Notification = {};
$(document).ready(function () {

    $(".list-block, .detail-list-block").hide();
    $(".main-block").click(function () {
        $(".list-block").toggle();
    });
    $(document).mouseup(function (e) {
        let container = $(".main-block");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".list-block").hide();
        }
    });
    $(".list-block .block-color").on('click', function () {
        $(".main-block .block-color span,.main-block .block-color label").remove();
        $(".main-block .block-color").append($(this).html());
    });

    $(".detail-main-block").click(function () {
        $(".detail-list-block").toggle();
    });

    $(document).mouseup(function (e) {
        let container = $(".detail-main-block");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".detail-list-block").hide();
        }
    });

    $(".detail-list-block .block-color").on('click', function () {
        $(".detail-main-block .block-color span,.detail-main-block .block-color label").remove();
        $(".detail-main-block .block-color").append($(this).html());
    });
    let appId = $("#app_id").val();
    let getNotification = function (requestData, renderFunction) {
        let sortField = columnDefinitions[requestData.order[0].column].data;
        let sortDir = requestData.order[0].dir;

        let params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": sortField,
            "sortDir": sortDir
        };

        jQuery.get("/api/v1/web/" + appId + "/notification/list", params, function (response) {
            let content = {
                "draw": requestData.draw,
                "recordsTotal": response.totalElements,
                "recordsFiltered": response.totalElements,
                "data": response.content
            };
            renderFunction(content);
            Notification.updateNotification();
        });
    };

    let columnDefinitions = [
        {
            "data": "title",
            "class": "text-center",
            "orderable": false,
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "startTime",
            "class": "text-center",
            "orderable": false,
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "endTime",
            "class": "text-center",
            "orderable": false,
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": null,
            "orderable": false,
            "class": "text-center",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "numberMemberUnique",
            "orderable": false,
            "class": "text-center",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "numberNotMemberUnique",
            "orderable": false,
            "class": "text-center",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "typeSendNoti",
            "class": "text-center",
            "orderable": false,
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": null,
            "class": "text-center",
            "orderable": false,
        }
    ];

    $("#notification_table").DataTable(
        {
            "language": {
                "url": "/libs/new_data_table/js/ja.json"
            },
            "lengthMenu": [[10, 20, 50], [10, 20, 50]],
            rowId: 'id',
            "order": [[0, "desc"]],
            "serverSide": true,
            "searching": false,
            "columns": columnDefinitions,
            "ajax": function (data, callback) {
                getNotification(data, callback);
            },
            columnDefs: [
                {
                    "render": function (data) {
                        if (data.includes("9999")) {
                            return "<span>無期限</span>";
                        } else {
                            return data;
                        }
                    },
                    "targets": 2
                },
                {
                    "render": function (data) {
                        if (data.typeSendNoti === 1) {
                            return data.toNumberUser + "件";
                        } else {
                            return '<a class="down-load-member-received-notification" target="_blank" href="' + "/api/v1/web/" + appId + "/notification/downloadUserReceivedNotification/" + data.id + '" data-toggle="tooltip" data-placement="top" title="指定会員ダウンロード">' + data.toNumberUser + '件</a>'
                        }
                    },
                    "targets": 3
                },
                {
                    "render": function (data) {
                        if (data === 1) {
                            return '<span class="text-center" style="color:#ffffff;padding:5px; background-color:#e63a3a;font-weight:bold; border-radius:5px;">すべて</span>'
                        } else {
                            return '<span class="text-center" style="color:#ffffff;padding:5px; background-color:#71c770;font-weight:bold; border-radius:5px;">会員指定配信</span>'
                        }
                    },
                    targets: 6
                }, {
                    "render": function (data) {
                        return '<label class="switch" style="margin-right: 5px;"><input type="checkbox" ' + (data.status === 1 ? "checked='checked'" : "") + ' name="status_param"/> <span class="slider round"></span></label>' +
                            '<button style="margin-right: 5px;" id="' + data.id + '" class="btn btn-primary btn-sm btn-update detail-notification btn-edit-size" data-toggle="modal" data-target="#modal_add_notification" >詳細</button>' +
                            '<button style="margin-right: 5px;" class="btn btn-primary btn-sm btn-download-member-read" id="btn_download_member_read_' + data.id + '" >既読会員ダウンロード</button>' +
                            '<button class="btn btn-danger btn-sm delete-notification" id="' + data.id + '" data-id="' + data.id + '" data-toggle="modal" data-target="#modal_delete_notification" >削除</button>';
                    },
                    targets: 7
                }
            ],
            "drawCallback": function () {
                $(".btn-download-member-read").click(function () {
                    let notificationId = $(this).attr("id").replace("btn_download_member_read_", "");
                    window.location.href = "/api/v1/web/" + appId + "/notification/downloadMemberReadNotificationCSV/" + notificationId;
                });
                $('.down-load-member-received-notification').tooltip({
                    delay: {show: 500, hide: 100},
                    html: true,
                    animation: true
                });

                $(".delete-notification").click(function () {
                    let notificationId = $(this).data("id");
                    $("#btn_submit_delete").on('click', function () {
                        $.post("/api/v1/web/" + appId + "/notification/delete/" + notificationId, {}, function () {
                            window.alert.show("success", "削除しました。", 1000);
                            setTimeout(function () {
                                location.reload()
                            }, 1000)
                        });
                    })
                });
            }
        });

    Notification.updateNotification = function () {
        $(".detail-notification").click(function () {
            let notificationId = $(this).attr("id");
            $("#notification_id").val(notificationId);
            AddNotification.update(notificationId);
        });
    };

    $(document).on('click', ".slider", function () {
        let notificationId = $(this).parent().parent().parent().attr('id');
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/notification/changeStatus/" + notificationId,
            error: function (xhr, ajaxOptions, thrownError) {

            },
            success: function (response) {
                switch (response.status.code) {
                    case 2000: {
                        window.alert.show("success", $("#success").html(), "2000");
                        break;
                    }
                }
            }

        })
    })


});