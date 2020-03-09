let ListNormalPKikaku = {};

$(document).ready(function () {
    configOneDateNotTime('start_range_of_start_time_normal');
    configOneDateNotTime('end_range_of_start_time_normal');
    $("#start_range_of_start_time_normal").val("");
    $("#end_range_of_start_time_normal").val("");

    let appId = $("#app_id").val();
    let companyId = $("#company_id").val();

    let columnDefinitions = [
        {"data": "id", "orderable": false, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
        {"data": "code", "sort": "code", "orderable": true, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
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
        {"data": "totalMember", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": null, "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": "numberUserCanUse", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {
            "data": null, "sort": "numberViewMemberUnique", "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {
            "data": null, "sort": "numberUseMemberUnique",
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {
            "data": null, "sort": "numberUseMember",
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {"data": null, "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": "usagePolicy", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
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

    ListNormalPKikaku.normalTable = $("#normal_p_kikaku_table").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [50, 100, 200],
            [50, 100, 200]
        ],
        "rowId": 'id',
        "ordering": true,
        "order": [[4, "desc"]],
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
                "type": "normal",
                "name": $("#plan_name_normal").val(),
                "code": $("#plan_code_normal").val(),
                "startTime": $("#start_range_of_start_time_normal").val(),
                "endTime": $("#end_range_of_start_time_normal").val()
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
                    return '<input class="check-box-normal-p-kikaku" type="checkbox" id="' + data + '"/>';
                },
                "targets": 0
            },
            {
                "render": function (data) {
                    return data + "(H)";
                },
                "targets": 1
            },
            {
                "render": function (data) {
                    if (data === 'PLUS_POINT_FOR_ALL') {
                        return 'ポイントプラス会員全員';
                    } else if (data === 'PLUS_POINT_FOR_MEMBER_DESIGNATION') {
                        return 'ポイントプラス特定顧客(会員指定)';
                    } else {
                        return 'ポイントプラス会員全員(発行枚数限定)';
                    }

                },
                "targets": 3
            },
            {
                "render": function (data) {
                    if (data.pointPlusType === 'PLUS_POINT_FOR_MEMBER_DESIGNATION') {
                        if (data.toNumberUser == null || data.toNumberUser === 0) {
                            return "0件";
                        } else {
                            return '<a class="down-load-member-received-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/pKikaku/downloadUserReceivedPKikaku/" + data.id + '" data-toggle="tooltip" data-placement="top" title="指定会員ダウンロード">' + data.toNumberUser + '件</a>'
                        }

                    } else {
                        return "ー";
                    }
                },
                "targets": 7
            },
            {
                "render": function (data) {
                    if (data === 0) {
                        return "ー"
                    } else {
                        return data + " 枚";
                    }
                },
                "targets": 8
            },
            {
                "render": function (data) {
                    return '<a class="down-load-member-view-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/pKikaku/downloadMemberUseOrReadPKikakuCSV/" + data.id + "?typeUse=1" + '"  data-toggle="tooltip" data-placement="top" title="会員番号ダウンロード">' + data.numberViewMemberUnique + '件</a>'
                },
                "targets": 9
            },
            {
                "render": function (data) {
                    return '<a class="down-load-member-use-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/pKikaku/downloadMemberUseOrReadPKikakuCSV/" + data.id + "?typeUse=2" + '" data-toggle="tooltip" data-placement="top" title="会員番号ダウンロード">' + data.numberUseMemberUnique + '件</a>'
                },
                "targets": 10
            },
            {
                "render": function (data) {
                    return '<a class="down-load-member-use-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/pKikaku/downloadMemberUseOrReadPKikakuCSV/" + data.id + "?typeUse=3" + '" data-toggle="tooltip" data-placement="top" title="会員番号ダウンロード">' + data.numberUseMember + '件</a>'
                },
                "targets": 11
            },
            {
                "render": function (data) {
                    return '<a class="" target="_blank" href="' + "/api/v1/web/" + appId + "/pKikaku/downloadListCoupon/" + data.id + '" data-toggle="tooltip" data-placement="top" title="クーポン明細CSVダウンロード">' + data.numberCoupon + '件</a><br/>';
                },
                "targets": 12
            },

            {
                "render": function (data) {
                    if (data === 'ONCE_TIME') {
                        return '一回のみ';
                    } else if (data === 'ONCE_TIME_PER_DAY') {
                        return '１日１回';
                    } else {
                        return '無制限';
                    }
                },
                "targets": 13
            },
            {
                "render": function (data) {
                    return getTextPKikakuFromStatus(data);
                },
                "targets": 15
            },
            {
                "render": function (data) {
                    return '<label id="' + data.id + '" class="switch" style="margin-right: 5px;"><input type="checkbox" ' + (data.active ? "checked='checked'" : "") + ' name="status_param"/> <span class="slider round slider-normal"></span></label>';
                },
                "targets": 16
            },
            {
                "render": function (data) {
                    return '<a style="margin-top: 5px;" class="" target="_blank" href="' + "/company/" + companyId + "/app/" + appId + "/newCoupon?pKikakuId=" + data.id + '" data-toggle="tooltip" data-placement="top" title="クーポン一覧"><button class="btn btn-sm btn-primary" style="font-size: 6px;">クーポン一覧</button></a><br/>' +
                        "<button class='btn btn-danger btn-sm btn-delete' style='font-size: 8px; margin-top: 5px;' id='" + data.id + "'>削除</button></div>"
                },
                "targets": 17
            }

        ],
        "drawCallback": function () {
            $('.down-load-member-received-coupon').tooltip({
                delay: {show: 500, hide: 100},
                html: true,
                animation: true
            });
            $(".slider-normal").click(function () {
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
                    e.preventDefault();
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

            $(".check-all-normal-p-kikaku").click(function () {
                if (this.checked) {
                    $(".check-box-normal-p-kikaku").prop("checked", true);
                } else {
                    $(".check-box-normal-p-kikaku").prop("checked", false);
                }
            })

        },// end drawn callback
        "createdRow": function (nRow, aData) {
            $(nRow).css('background-color', getColorPKikakuFromStatus(aData.typeDisplayPKikaku));
        }
    });// end data table init


    $("#search_btn").on('click', function () {
        ListNormalPKikaku.normalTable.ajax.reload();
    });
    $("#submit_config").on('click', function () {
        let listPKikakuSelected = [];
        $(".check-box-normal-p-kikaku").each(function () {
            if (this.checked) {
                listPKikakuSelected.push($(this).attr('id'));
            }
        });
        if (listPKikakuSelected.length === 0) {
            window.alert.show("error", "企画を選択してきださい。", 1200);
            return;
        }
        let typeUse = $("#choose_type_use").val();
        let numberCoupon = $("#number_coupon_can_use_input").val();
        if (numberCoupon.trim() === "") {
            numberCoupon = 0;
        }
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/pKikaku/updateListPKikaku?pKikakuIds=" + listPKikakuSelected.join(",") + "&typeUse=" + typeUse + "&numberCoupon=" + numberCoupon,
            beforeSend: function () {
                window.loader.show();
            },
            success: function () {
                window.loader.hide();
                window.alert.show("success", "企画の情報を設定されました。", 1200);
                ListNormalPKikaku.normalTable.ajax.reload(null, false);
            }
        });
    });

    $("#btn_submit_gen_barcode").on('click', function () {
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/newCoupon/genBarcode",
        });
        $("#modal_confirm_gen_barcode").modal("hide");
        window.alert.show("success", "バーコード画像生成を開始しました。作成状況はクーポン明細画面からご確認ください。", 5000);
    });

    $("#data_reload").on('click', function () {
        window.location.reload();
    });
});


