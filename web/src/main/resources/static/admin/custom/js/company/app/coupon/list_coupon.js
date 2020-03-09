let ListCoupon = {};

$(document).ready(function () {

    let appId = $("#app_id").val();

    let columnDefinitions = [
        {"data": null, "orderable": false, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
        {"data": "usageScope", "orderable": false, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
        {"data": null, "orderable": false, "class": "text-center", "defaultContent": "<i>データ無し</i>"},
        {"data": "usagePolicy", "class": "position-relative-col text-center", "orderable": false,},
        {"data": "numberViewMemberUnique", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": "numberUseMemberUnique", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": "startTime", "orderable": true, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": "endTime", "orderable": true, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": "createdTime", "orderable": true, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
        {"data": "id", "orderable": false, "defaultContent": "<i>データ無し</i>", "class": "text-center"},
    ];

    ListCoupon.couponTable = $("#coupon_table").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [10, 20, 50],
            [10, 20, 50]
        ],
        "rowId": 'id',
        "ordering": true,
        "order": [[8, "desc"]],
        "serverSide": true,
        "bFilter": false,
        "bInfo": true,
        "bLengthChange": true,
        "columns": columnDefinitions,

        "ajax": function (requestParams, callback) {
            let sortField = columnDefinitions[requestParams.order[0].column].data;
            let sortDir = requestParams.order[0].dir;

            let params = {
                "page": (requestParams.start / requestParams.length) + 1,
                "size": requestParams.length,
                "sortField": sortField,
                "sortDir": sortDir
            };

            window.loader.show();
            jQuery.get("/api/v1/web/" + appId + "/coupon/listForWeb", params, function (response) {
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
                    return '<div><div><img src="' + data.imageUrl + '"></div><div style="margin-top: 5px;">' + data.name + '</div></div>';
                },
                "targets": 0
            },
            {
                "render": function (data) {
                    if (data === 'MEMBER') {
                        return '会員連携済み全ユーザ';
                    } else if (data === 'EVERYONE') {
                        return '全ユーザ（会員未連携含む)';
                    } else {
                        return "指定会員のみ";
                    }

                },
                "targets": 1
            },
            {
                "render": function (data) {
                    if (data.toNumberUser == null) {
                        return "データなし"
                    }
                    if (data.usageScope !== "MEMBER_DESIGNATION") {
                        return data.toNumberUser + "件";
                    } else {
                        return '<a class="down-load-member-received-coupon" target="_blank" href="' + "/api/v1/web/" + appId + "/coupon/downloadUserReceivedCoupon/" + data.id + '" data-toggle="tooltip" data-placement="top" title="指定会員ダウンロード">' + data.toNumberUser + '件</a>'
                    }
                },
                "targets": 2
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
                "targets": 3
            },
            {
                "render": function (id) {
                    return "<div style='margin-bottom: 10px;'><button style='margin-right: 5px; font-size: 8px' class='btn btn-primary btn-sm btn-update' data-id='" + id + "'>詳細</button>"
                        + "<button class='btn btn-danger btn-sm btn-delete' style='font-size: 8px' id='" + id + "'>削除</button></div>"
                        + '<button style="margin-right: 5px; font-size: 8px" class="btn btn-primary btn-sm btn-download-member-view" id="btn_download_member_view_' + id + '" >閲覧会員CSVダウンロード</button>'
                        + '<button style="margin-right: 5px; font-size: 8px" class="btn btn-primary btn-sm btn-download-member-use" id="btn_download_member_use_' + id + '" >利用会員CSVダウンロード</button>';
                },
                "targets": 9
            }

        ],
        "drawCallback": function () {
            $('.down-load-member-received-coupon').tooltip({
                delay: {show: 500, hide: 100},
                html: true,
                animation: true
            });

            $(".btn-update").click(function () {
                let id = Number($(this).data("id"));
                jQuery.get("/api/v1/web/" + appId + "/coupon/detail/" + id, {}, function (response) {
                    $("#save_coupon_modal").modal('show');
                    coupon.couponVue.updateForm(response);
                });
            });

            $(".btn-delete").click(function () {
                let couponId = $(this).attr('id');
                $("#modal_delete_coupon").modal();
                $("#btn_submit_delete").click(function (e) {
                    e.preventDefault();
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/coupon/delete/" + couponId,
                        beforeSend: function () {
                            window.loader.show();
                        },
                        success: function () {
                            window.loader.hide();
                            $("#modal_delete_coupon").modal("hide");
                            window.alert.show("success", "クーポンを削除しました。", 1200);
                            ListCoupon.couponTable.ajax.reload(null, false);
                        }
                    });
                });

            });

            $(".btn-download-member-view").click(function () {
                let couponId = $(this).attr("id").replace("btn_download_member_view_", "");
                window.location.href = "/api/v1/web/" + appId + "/coupon/downloadMemberUseOrReadCouponCSV/" + couponId + "?typeUse=1";
            });
            $(".btn-download-member-use").click(function () {
                let couponId = $(this).attr("id").replace("btn_download_member_use_", "");
                window.location.href = "/api/v1/web/" + appId + "/coupon/downloadMemberUseOrReadCouponCSV/" + couponId + "?typeUse=2";
            });
        }// end drawn callback
    });// end data table init

});
