let ListSpecialPKikaku = {};

$(document).ready(function () {
    configOneDateNotTime('start_range_of_start_time_plus');
    configOneDateNotTime('end_range_of_start_time_plus');
    $("#start_range_of_start_time_plus").val("");
    $("#end_range_of_start_time_plus").val("");

    let appId = $("#app_id").val();
    let companyId = $("#company_id").val();


    let columnDefinitions = [
        {"data": null, "sort": "code", "orderable": true, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
        {"data": "name", "orderable": false, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
        {"data": "pointPlusType", "orderable": false, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
        {"data": "startTime", "sort": "startTime", "class": "position-relative-col text-center", "orderable": true},
        {
            "data": "endTime",
            "sort": "endTime",
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {
            "data": null,
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {
            "data": null,
            "sort": "numberViewMemberUnique",
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {
            "data": null,
            "sort": "numberUseMemberUnique",
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {
            "data": null,
            "sort": "numberUseMember",
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {"data": null, "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {
            "data": "updatedTimeFromFile",
            "sort": "updatedTimeFromFile",
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {"data": "typeDisplayPKikaku", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": null, "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": null, "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
    ];

    ListSpecialPKikaku.specialTable = $("#point_plus_coupon_table").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [50, 100, 200],
            [50, 100, 200]
        ],
        "rowId": 'id',
        "ordering": true,
        "order": [[3, "desc"]],
        "serverSide": true,
        "bFilter": false,
        "bInfo": true,
        "bLengthChange": true,
        "columns": columnDefinitions,

        "ajax": function (requestParams, callback) {
            let sortField = columnDefinitions[requestParams.order[0].column].sort;
            let sortDir = requestParams.order[0].dir;
            let params = {
                "page": (requestParams.start / requestParams.length) + 1,
                "size": requestParams.length,
                "sortField": sortField,
                "sortDir": sortDir,
                "type": "special",
                "name": $("#plan_name_plus").val(),
                "code": $("#plan_code_plus").val(),
                "startTime": $("#start_range_of_start_time_plus").val(),
                "endTime": $("#end_range_of_start_time_plus").val()
            };

            window.loader.show();
            jQuery.get("/api/v1/web/" + appId + "/pKikaku/list", params, function (response) {
                let coupons = response.content;
                callback({
                    "draw": requestParams.draw,
                    "recordsTotal": response.totalElements,
                    "recordsFiltered": response.totalElements,
                    "data": coupons
                });
                window.loader.hide();
            });
        },

        columnDefs: [
            {
                "render": function (data) {
                    return data.code + "(" + data.fixedDataFormat + ")";
                },
                "targets": 0
            },
            {
                "render": function () {
                    return '特定顧客（Sポイントプラス)';
                },
                "targets": 2
            },
            {
                "render": function (data) {
                    return '<a class="down-load-member-view-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/pKikaku/downloadPKikakuMember/" + data.id  + '"  data-toggle="tooltip" data-placement="top" title="会員番号ダウンロード">' + data.couponReleasedNumber + '件</a>'
                },
                "targets": 5
            },
            {
                "render": function (data) {
                    return '<a class="down-load-member-view-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/pKikaku/downloadMemberUseOrReadPKikakuCSV/" + data.id + "?typeUse=1" + '"  data-toggle="tooltip" data-placement="top" title="会員番号ダウンロード">' + data.numberViewMemberUnique + '件</a>'
                },
                "targets": 6
            },
            {
                "render": function (data) {
                    return '<a class="down-load-member-use-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/pKikaku/downloadMemberUseOrReadPKikakuCSV/" + data.id + "?typeUse=2" + '" data-toggle="tooltip" data-placement="top" title="会員番号ダウンロード">' + data.numberUseMemberUnique + '件</a>'
                },
                "targets": 7
            },
            {
                "render": function (data) {
                    return '<a class="down-load-member-use-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/pKikaku/downloadMemberUseOrReadPKikakuCSV/" + data.id + "?typeUse=3" + '" data-toggle="tooltip" data-placement="top" title="会員番号ダウンロード">' + data.numberUseMember + '件</a>'
                },
                "targets": 8
            },
            {
                "render": function (data) {
                    return '<a class="" target="_blank" href="' + "/api/v1/web/" + appId + "/pKikaku/downloadListCoupon/" + data.id + '" data-toggle="tooltip" data-placement="top" title="クーポン明細CSVダウンロード">' + data.numberCoupon + '件</a><br/>';
                },
                "targets": 9
            },
            {
                "render": function (data) {
                    return getTextPKikakuFromStatus(data);
                },
                "targets": 11
            },
            {
                "render": function (data) {
                    return '<label id="' + data.id + '" class="switch" style="margin-right: 5px;"><input type="checkbox" ' + (data.active ? "checked='checked'" : "") + '/> <span class="slider round slider-special"></span></label>';
                },
                "targets": 12
            },
            {
                "render": function (data) {
                    return '<a style="margin-top: 5px;" class="" target="_blank" href="' + "/company/" + companyId + "/app/" + appId + "/newCoupon?pKikakuId=" + data.id + '" data-toggle="tooltip" data-placement="top" title="クーポン一覧"><button class="btn btn-sm btn-primary" style="font-size: 6px;">クーポン一覧</button></a><br/>' +
                        "<button class='btn btn-danger btn-sm btn-delete' style='font-size: 8px; margin-top: 5px;' id='" + data.id + "'>削除</button></div>"
                },
                "targets": 13
            }

        ],
        "drawCallback": function () {
            $('.down-load-member-received-coupon').tooltip({
                delay: {show: 500, hide: 100},
                html: true,
                animation: true
            });
            $(".slider-special").click(function () {
                let id = $(this).parent().attr('id');
                jQuery.get("/api/v1/web/" + appId + "/pKikaku/changeStatus/" + id, {}, function () {
                    window.alert.show("success", "変更しました。", 1200);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1200);
                });
            });

            $(".btn-delete").click(function () {
                let pKikakuId = $(this).attr('id');
                $("#modal_delete_coupon").modal();
                $("#btn_submit_delete").click(function (e) {
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/pKikaku/delete/" + pKikakuId,
                        beforeSend: function () {
                            window.loader.show();
                        },
                        success: function () {
                            window.loader.hide();
                            $("#modal_delete_coupon").modal("hide");
                            window.alert.show("success", "企画を削除しました。", 1200);
                            setTimeout(function () {
                                window.location.reload();
                            }, 1200);
                        }
                    });
                });

            });

        },// end drawn callback
        "createdRow": function (nRow, aData) {
            $(nRow).css('background-color', getColorPKikakuFromStatus(aData.typeDisplayPKikaku));
        }
    });// end data table init


    $("#search_btn_point_plus").on('click', function () {
        ListSpecialPKikaku.specialTable.ajax.reload();
    });

});


