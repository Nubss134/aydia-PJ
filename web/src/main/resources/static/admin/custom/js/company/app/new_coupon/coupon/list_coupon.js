let ListCoupon = {};

$(document).ready(function () {
    let appId = $("#app_id").val();
    let pKikakuId = $("#p_kikaku_id").val();

    configOneDate('start_time_p_kikaku');
    configOneDate('end_time_p_kikaku');

    let columnDefinitions = [
        {"data": null, "sort": "code", "orderable": true, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
        {"data": null, "orderable": false, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
        {"data": "code", "sort": "code", "orderable": true, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
        {"data": "name", "class": "position-relative-col text-center", "orderable": false,},
        {"data": "categoryCode", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": "categoryName", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {
            "data": "point",
            "sort": "point",
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {"data": "description", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": null, "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
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
        {
            "data": "createdTimeFromFile",
            "sort": "createdTimeFromFile",
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {"data": "typeDisplayCoupon", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {
            "data": null,
            "sort": "position",
            "orderable": true,
            "defaultContent": "<i>データ無し</i>",
            "class": "text-center"
        },
        {"data": "id", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
    ];

    ListCoupon.normalTable = $("#coupon_table").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [50, 100, 200],
            [50, 100, 200]
        ],
        "rowId": 'id',
        "ordering": true,
        "order": [[14, "asc"]],
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
                "categoryName": $("#category_name").val(),
                "code": $("#coupon_code_input").val(),
                "couponName": $("#coupon_name_input").val(),
                "hasImage": $("#has_coupon_image").val(),
                "point": $("#number_point").val(),
                "pKikakuId": pKikakuId
            };
            window.loader.show();
            jQuery.get("/api/v1/web/" + appId + "/newCoupon/listForWeb", params, function (response) {
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
                "render": function (data) {
                    if (data.imageUrl == null || data.imageUrl === "") {
                        return '<div>' +
                            '<p style="color: red;">画像なし</p>' +
                            '<span>' + data.imageName + '</span>' +
                            '</div>';
                    } else {
                        return '<div>' +
                            '<div><img src="' + data.imageUrl + '" alt="" style="margin-bottom: 10px;"></div>' +
                            '<a target="_blank" href="/api/v1/web/' + appId + "/newCoupon/downloadImageCoupon/" + data.id + '?type=image"><span>' + data.imageName + '</span></a>' +
                            '</div>';
                    }
                },
                "targets": 1
            },
            {
                "render": function (data) {
                    return '<div style="text-align: left">' + data + '</div>'
                },
                "targets": 7
            },
            {
                "render": function (data) {
                    if (data.barCodeUrl == null || data.barCodeUrl === "") {
                        return '<div>' +
                            '<p>バーコード画像なし</p>' +
                            '<span>' + data.janCode + '</span>' +
                            '</div>';
                    } else {
                        return '<div>' +
                            '<img src="' + data.barCodeUrl + '" alt="" style="margin-bottom: 10px;">' +
                            '<a target="_blank" href="/api/v1/web/' + appId + "/newCoupon/downloadImageCoupon/" + data.id + '?type=barCode"><span>' + data.jan13 + '</span></a>' +
                            '</div>';
                    }
                },

                "targets": 8
            },
            {
                "render": function (data) {
                    return '<a class="down-load-member-view-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/newCoupon/downloadMemberUseOrRead/" + data.id + "?typeUse=1" + '"  data-toggle="tooltip" data-placement="top" title="会員番号ダウンロード">' + data.numberViewMemberUnique + '件</a>'
                },
                "targets": 9
            },
            {
                "render": function (data) {
                    return '<a class="down-load-member-use-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/newCoupon/downloadMemberUseOrRead/" + data.id + "?typeUse=2" + '" data-toggle="tooltip" data-placement="top" title="会員番号ダウンロード">' + data.numberUseMemberUnique + '件</a>'
                },
                "targets": 10
            },
            {
                "render": function (data) {
                    return '<a class="down-load-member-use-p-kikaku" target="_blank" href="' + "/api/v1/web/" + appId + "/newCoupon/downloadMemberUseOrRead/" + data.id + "?typeUse=3" + '" data-toggle="tooltip" data-placement="top" title="会員番号ダウンロード">' + data.numberUseMember + '件</a>'
                },
                "targets": 11
            },
            {
                "render": function (data) {
                    return getTextPKikakuFromStatus(data);
                },
                "targets": 13
            },
            {
                "render": function (data) {
                    return '<label id="' + data.id + '" data-position="' + data.position + '" class="switch get-position" style="margin-right: 5px;"><input type="checkbox" ' + (data.active ? "checked='checked'" : "") + ' name="status_param"/> <span class="slider round"></span></label>';
                },
                "targets": 14
            },
            {
                "render": function (id) {
                    return "<div style='margin-bottom: 10px;'><button style='margin-right: 5px; font-size: 10px' class='btn btn-primary btn-sm btn-update btn-update-coupon' data-id='" + id + "'>詳細</button></div>"
                        + "<div><button class='btn btn-danger btn-sm btn-delete' style='font-size: 10px' id='" + id + "'>削除</button></div>"
                },
                "targets": 15
            }

        ],
        "drawCallback": function () {
            $('.down-load-member-received-coupon').tooltip({
                delay: {show: 500, hide: 100},
                html: true,
                animation: true
            });
            $(".slider").click(function () {

                let id = $(this).parent().attr('id');
                jQuery.get("/api/v1/web/" + appId + "/newCoupon/changeStatus/" + id, {}, function () {
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
                        url: "/api/v1/web/" + appId + "/newCoupon/delete/" + pKikakuId,
                        beforeSend: function () {
                            window.loader.show();
                        },
                        success: function () {
                            window.loader.hide();
                            $("#modal_delete_coupon").modal("hide");
                            window.alert.show("success", "クーポンを削除しました。", 1200);
                            setTimeout(function () {
                                window.location.reload();
                            }, 2000);
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

        },
        "createdRow": function (nRow, aData) {
            $(nRow).css('background-color', getColorPKikakuFromStatus(aData.typeDisplayCoupon));
        }// end drawn callback,
    });// end data table init


    $("#search_coupon").on('click', function () {
        ListCoupon.normalTable.ajax.reload();
    });

    $(document).on("click", ".btn-update-coupon", function () {
        window.loader.show();
        let id = $(this).data("id");
        $.ajax({
            url: "/api/v1/web/" + appId + "/newCoupon/detail/" + id,
            type: "GET",
            success: function (res) {
                let coupon = res.data;
                window.loader.hide();
                $("#new_coupon_id").val(id);
                newCouponVue.detailCoupon(coupon);
            },
            error: function () {
                window.alert.show("error", " error", 1000);
            }
        });
        $("#detail_coupon_template").modal("show");
    });

    $("#btn_submit_gen_barcode").on('click', function () {
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/newCoupon/genBarcode",
        });
        $("#modal_confirm_gen_barcode").modal("hide");
        window.alert.show("success", "バーコード画像生成を開始しました。作成状況はクーポン明細画面からご確認ください。", 5000);
    });

    $("#page_reload").on('click', function () {
        window.location.reload();
    });

    $("#btn_submit_save_order").on('click', function () {
        let listId = [];
        let listPosition = [];
        $('.get-position').each(function () {
            let id = $(this).attr('id');
            listId.push(id);
            let position = $(this).data('position');
            listPosition.push(position);

        });
        if (listId.length === 0) {
            window.alert.show("success", "データがないので、並び順更新できないです。", 2000);
            return;
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/v1/web/" + appId + "/newCoupon/updateOrder?listId=" + listId.join(",") + "&listPosition=" + listPosition.join(","),
            error: function (xhr, ajaxOptions, thrownError) {
            },
            success: function (response) {
                if (response.status.code === 1000) {
                    window.alert.show("success", "並び順更新しました。", 1500);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500)
                } else {
                    window.alert.show("error", "申し訳ありません。エラーです。しばらくしてからもう一度お試しください", 2000);
                }
            }

        })
    });
    let fixHelperModified = function (e, tr) {
        let $originals = tr.children();
        let $helper = tr.clone();
        $helper.children().each(function (index) {
            $(this).width($originals.eq(index).width())
        });
        return $helper;
    }, updateIndex = function (e, ui) {
        $('td.index', ui.item.parent()).each(function (i) {
            $(this).html(i + 1);
        });
    };

    $("tbody").sortable({
        helper: fixHelperModified,
        stop: updateIndex
    }).disableSelection();


    $("#import_member_code_file_name").on('click', function () {
        let href = "/api/v1/web/" + appId + "/pKikaku/downloadUserReceivedPKikaku/" + pKikakuId;
        window.open(href, '_blank');
    })


});


