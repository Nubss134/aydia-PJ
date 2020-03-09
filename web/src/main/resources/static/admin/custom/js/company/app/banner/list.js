$(document).ready(function () {
    var appId = $("#app_id").val();
    var url = "/api/v1/web/" + appId + "/bannerImage/list";
    var columnDefinitions = [
        {"data": "memoUpdated", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": "imageUrlUpdated", "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "imageApplyUrlUpdated", "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "startTimeUpdated", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": null, "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": "numberViewUnique", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": "numberView", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": "numberUserApply", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": null, "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"}
    ];
    var table = configDataTableServerSide({
        element: "#banner_table",
        url: url,
        columnDefinitions: columnDefinitions,
        columnOrder: 0,
        columnDefs: [
            {
                "render": function (data) {
                    return "<div style='max-width: 150px;'>" + data + "</div>";

                },
                "targets": 0
            },
            {
                "render": function (data) {
                    return "<img alt='' src='" + data + "' style='width: 60px; height: 40px;'/>"
                },
                "targets": 1
            },
            {
                "render": function (data) {
                    if (data != null) {
                        return "<img alt='' src='" + data + "' style='width: 60px; height: 40px;'/>";
                    } else {
                        return "データなし";
                    }

                },
                "targets": 2
            },
            {
                "render": function (data) {
                    if (data.endTimeUpdated.includes("9999")) {
                        return "<span>無期限</span>";
                    } else {
                        return data.endTimeUpdated;
                    }
                },
                "targets": 4
            },
            {
                "render": function (data) {
                    return '<label class="switch" style="margin-right: 5px;"><input type="checkbox" ' + (data.activeUpdated ? "checked='checked'" : "") + ' name="status_param"/> <span class="slider round"></span></label>' +
                        '<button style="margin-right: 5px;" class="btn btn-primary btn-sm btn-update-banner" id="btn_update_' + data.id + '" data-toggle="modal" data-target="#modal_banner_image" >詳細</button>' +
                        '<button style="margin-right: 5px;" class="btn btn-primary btn-sm btn-download-banner" id="btn-download-banner-' + data.id + '" >ダウンロード</button>' +
                        '<button class="btn btn-danger btn-sm btn-delete-banner" id="' + data.id + '" data-toggle="modal" data-target="#modal_delete_banner" >削除</button>';
                },
                "targets": 8
            }
        ],
        drawCallback: function () {

            $(".btn-download-banner").on('click', function () {
                var bannerId = $(this).attr("id").replace("btn-download-banner-", "");
                window.location.href = "/api/v1/web/" + appId + "/bannerImage/downloadUserApplyBannerCSV/" + bannerId;
            });

            $(".btn-update-banner").click(function () {
                var bannerId = $(this).attr('id').replace("btn_update_", "");
                jQuery.get("/api/v1/web/" + appId + "/bannerImage/" + bannerId, function (response) {
                    //banner.eventVue.resetForm();
                    banner.eventVue.updateForm(response.data);
                    banner.eventVue.isUpdate = true;
                });
            });
            $(".btn-delete-banner").click(function () {
                var id = $(this).attr('id').replace("btn_delete_", "");
                $("#btn_submit_delete").on('click', function () {
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/bannerImage/delete/" + id,
                        success: function (response) {
                            switch (response.status.message) {
                                case "SUCCESS": {
                                    $('html,body').animate({
                                        scrollTop: 0
                                    }, 300);
                                    window.alert.show("success", "削除しました。", 3000);
                                    setTimeout(function () {
                                        location.reload();
                                    }, 1000);
                                    break;
                                }
                                case "ERROR": {
                                    window.alert.show("error", response.data, 3000);
                                    break;
                                }
                            }
                        }
                    })
                });
            });

        }
    });
    if ($("#is_system_admin").val() === 'false') {
        table.column(0).visible(false);
    }
});
