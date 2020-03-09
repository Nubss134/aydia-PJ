$(document).ready(function () {

    let listPKikaku;
    let listCoupon;
    let pKikakuId = $("#p_kikaku_id").val();
    let pKikakuTable = $('#table_p_kikaku_normal_coupon_import').DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [10, 20, 50],
            [10, 20, 50]
        ],
        "ordering": false,
        "searching": false,
        "paging": false,
    });
    let couponTable = $('#table_normal_coupon_import').DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [10, 20, 50],
            [10, 20, 50]
        ],
        "ordering": false,
        "searching": false,
        "paging": false
    });

    let appId = $("#app_id").val();

    let $importPKikakuCsvButton = $("#import_p_kikaku_normal_coupon_btn, #import_p_kikaku_point_plus_coupon_btn, #import_coupon_btn");
    let $importPKikakuCsvInput = $("#import_p_kikaku_normal_coupon_input, #import_coupon_btn_input");

    $importPKikakuCsvButton.click(function () {
        $importPKikakuCsvInput.click();
    });

    $importPKikakuCsvInput.change(function () {
        let fileExtension = ["csv"];
        if (this.files[0].length < 1) {
            return;
        }
        if ($.inArray($importPKikakuCsvInput.val().split('.').pop().toLowerCase(), fileExtension) === -1) {
            window.alert.show("error", 'CSVファイルのみ', 1500);
            return;
        }
        importPKikakuCSV(this.files[0]);
        $importPKikakuCsvInput.val(null);
        return false;
    });

    $(document).on("click", "#btn_submit_import_p_kikaku_normal_coupon", function () {
        let data = getDataImport();
        if (data.newCouponDtos.length === 0 && data.pKikakuDtos.length === 0) {
            $("#modal_p_kikaku_normal_coupon_import").modal("hide");
            window.alert.show("error", "データがありません、再インポートしてください。", 2000);
            return;
        }
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/pKikaku/submitImport",
            data: JSON.stringify(getDataImport()),
            processData: false,
            contentType: 'application/json',
            beforeSend: function () {
                window.loader.show();
            },
            success: function (response) {
                $("#modal_p_kikaku_normal_coupon_import").modal("hide");
                window.loader.hide();
                let code = response.status.code;
                if (code === 1000) {
                    window.alert.show("success", "成功", 2000);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1200)
                } else {
                    window.alert.show("error", "申し訳ありません。エラーです。しばらくしてからもう一度お試しください", 2000);
                }
            },
            error: function () {
                window.alert.show("error", "申し訳ありません。エラーです。しばらくしてからもう一度お試しください", 2000);
            }
        })
    });

    $(document).on("click", ".btn-delete-p-kikaku-import", function () {
        let code = $(this).attr('id');
        pKikakuTable.row($(this).parents("tr")).remove().draw();
        listPKikaku = removeByCode(listPKikaku, code);
    });

    $(document).on("click", ".btn-delete-coupon-import", function () {
        let code = $(this).attr('id');
        // let element = $(this).parents('tr');
        couponTable.row($(this).parents('tr')).remove().draw();
        listCoupon = removeByCode(listCoupon, code)
    });

    function removeByCode(list, code) {
        return list.filter(item => item.code !== code);
    }

    function importPKikakuCSV(pKikakuCSVFile) {
        let formData = new FormData();
        formData.append("pKikakuCSVFile", pKikakuCSVFile);
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/pKikaku/importCSV?pKikakuId=" + pKikakuId,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                window.loader.show();
            },
            success: function (result) {
                console.log(result);
                window.loader.hide();
                fillListPKikakuImportToTable(result);
                $("#modal_p_kikaku_normal_coupon_import").modal("show");
            }
        })
    }

    function fillListPKikakuImportToTable(result) {
        if (result.errorImport.length !== 0) {
            let listPKikakuCodeError = [];
            let listCouponCode = [];
            result.errorImport.forEach(function (entry) {
                listPKikakuCodeError.push(entry.pKikakuCode);
                listCouponCode.push(entry.couponCodes);
            });
            let textErrorPKikaku = "<p>以下、取込不正データがあり、取込がスキップされました。エラーのないデータのみ下記に表示しています。</p>企画コード：" + listPKikakuCodeError.join(" , ");
            let textErrorCoupon = "<p>以下、取込不正データがあり、取込がスキップされました。エラーのないデータのみ下記に表示しています。</p>";
            for (let i = 0; i < listCouponCode.length; i++) {
                textErrorCoupon += "企画コード：" + listPKikakuCodeError[i] + "、明細コード：" + listCouponCode[i].join(" , ") + "<br/>"
            }
            $("#text_error_p_kikaku").html(textErrorPKikaku);
            $("#text_error_coupon").html(textErrorCoupon);
        } else {
            $("#text_error_p_kikaku").html("");
            $("#text_error_coupon").html("");
        }

        listPKikaku = result.pKikakuDtos;
        listCoupon = result.newCouponDtos;
        let htmlPKikaku = '';
        let htmlCoupon = '';
        for (let i = 0; i < listPKikaku.length; i++) {
            htmlPKikaku += '<tr><td  class="fixedDataFormat">' + listPKikaku[i].fixedDataFormat +
                '</td><td class="code">' + listPKikaku[i].code +
                '</td><td class="name">' + listPKikaku[i].name +
                '</td><td class="pointPlusType">' + changePointPlusType(listPKikaku[i].pointPlusType) +
                '</td><td class="startTime">' + listPKikaku[i].startTime +
                '</td><td class="endTime">' + listPKikaku[i].endTime;
        }
        $('#table_p_kikaku_normal_coupon_import tbody tr').remove();
        $('#table_p_kikaku_normal_coupon_import tbody').append(htmlPKikaku);

        function changePointPlusType(type) {
            switch (type) {
                case "0":
                    return "0：ポイントプラス会員全員";
                case "1":
                    return "1：ポイントプラス特定顧客（会員指定）";
                case "8":
                    return "8：ポイントプラス会員全員（発行枚数限定）";
                case "9":
                    return "9：ポイントプラス特定顧客（Sポイントプラス）";
            }

        }

        for (let i = 0; i < listCoupon.length; i++) {
            let textUpdate;
            if (listCoupon[i].update === true) {
                textUpdate = "変更";
            } else {
                textUpdate = "追加";
            }
            let textUpdateTime = 'データなし';
            if (listCoupon[i].createdTimeFromFile != null) {
                textUpdateTime = listCoupon[i].createdTimeFromFile;
            }
            let categoryCode = listCoupon[i].categoryCode;
            if (categoryCode == null) {
                categoryCode = '';
            }
            htmlCoupon += '<tr><td class="p-kikaku-code">' + listCoupon[i].pKikakuCode +
                '</td><td class="p-kikaku-code">' + listCoupon[i].pKikakuName +
                '</td><td class="p-kikaku-code">' + changePointPlusType(listCoupon[i].pointPlusType) +
                '<td  class="fixedDataFormat">' + listCoupon[i].fixedDataFormat +
                '</td><td class="category-code">' + categoryCode +
                '</td><td class="category-name">' + listCoupon[i].categoryName +
                '</td><td class="category-name">' + listCoupon[i].code +
                '</td><td class="endTime">' + listCoupon[i].couponName +
                '</td><td class="endTime">' + listCoupon[i].couponDescription +
                '</td><td class="endTime">' + listCoupon[i].couponPoint +
                '</td><td class="endTime">' + listCoupon[i].couponImageName +
                '</td><td class="endTime">' + listCoupon[i].couponImageUrl +
                '</td><td class="endTime">' + listCoupon[i].janCode +
                '</td><td class="endTime">' + listCoupon[i].couponImageUrl_2 +
                '</td><td class="endTime">' + listCoupon[i].couponImageUrl_3 +
                '</td><td class="endTime">' + listCoupon[i].couponImageUrl_4 +
                '</td><td class="endTime">' + textUpdateTime;
        }
        $('#table_normal_coupon_import tbody tr').remove();
        $('#table_normal_coupon_import tbody').append(htmlCoupon);

    }

    function getDataImport() {
        return {
            pKikakuDtos: listPKikaku,
            newCouponDtos: listCoupon
        };

    }

});
