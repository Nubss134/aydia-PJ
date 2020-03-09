$(document).ready(function () {
    var appId = $("#app_id").val();
    $("#import_new_store_btn").click(function (e) {
        e.preventDefault();
        $("#new_store_file_input").val("")
        $("#new_store_file_input").trigger("click");
    });
    var xlsxStoreFileVerifyResult = {
        numErrors: 0,
        newStoreVerifyResults: [],
        storeCodes: [],
        storeIds: [],
        storeNames: []
    };
    var columnDefinitions = [
        {
            "data": "status",
            "orderable": false,
            "className": "status-row custom-css",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "idAttr",
            "orderable": false,
            "className": "id-cell custom-css",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "nameAttr",
            "orderable": false,
            "className": "custom-css",
            "defaultContent": "<i>データなし</i>"
        }, {
            "data": "codeAttr",
            "orderable": false,
            "className": "code-cell custom-css",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "postalCodeAttr",
            "orderable": false,
            "className": "custom-css",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "no_smokingAttr",
            "className": "custom-css",
            "orderable": false,
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "phoneAttr",
            "orderable": false,
            "className": "custom-css",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "phone2Attr",
            "orderable": false,
            "className": "custom-css",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "faxAttr",
            "orderable": false,
            "className": "custom-css",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "fax2Attr",
            "orderable": false,
            "className": "custom-css",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "faxReceiveAttr",
            "orderable": false,
            "className": "custom-css",
            "defaultContent": "<i>データなし</i>"
        },
        {
            "data": "dataId",
            "orderable": false,
            "className": "action-row",
            "defaultContent": "<i>データなし</i>"
        },
    ];
    var getVerifyResult = function (requestParams, callback) {
        var content = {
            "draw": requestParams.draw,
            "recordsTotal": xlsxStoreFileVerifyResult.newStoreVerifyResults.length,
            "recordsFiltered": xlsxStoreFileVerifyResult.newStoreVerifyResults.length,
            "data": []
        };
        if (xlsxStoreFileVerifyResult.newStoreVerifyResults.length > requestParams.start) {
            content.data = xlsxStoreFileVerifyResult.newStoreVerifyResults.slice(requestParams.start, requestParams.start + requestParams.length);
        }
        callback(content);
    };
    var importStoreTable = $("#import_store_table").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [10, 20, 50],
            [10, 20, 50]
        ],
        rowId: 'id',
        "ordering": true,
        "serverSide": true,
        "searching": true,
        "pageLength": 5,
        "columns": columnDefinitions,
        "ajax": function (requestParams, callback) {
            getVerifyResult(requestParams, callback);
        },
        "columnDefs": [
            {
                "render": function (status) {
                    if (status) {
                        return '<i class="fa fa-chevron-circle-down" style="color: green;"></i>';
                    } else {
                        return '<td> <i class="fa fa-minus-circle" style="color: red;"></i></td>';
                    }
                },
                "targets": 0
            },
            {
                "render": function (data) {
                    var className = "";
                    if (data.status === false) {
                        className = "error-cell";
                    }
                    return "<span class='" + className + "'>" + data.attributeValue + "</span><input class='form-control store-id hidden' min='0' type='number' value='" + data.attributeValue + "'/>";
                },
                "targets": 1
            },
            {
                "render": function (data) {
                    var className = "";
                    if (data.status === false) {
                        className = "error-cell";
                    }
                    return "<span class='" + className + "'>" + data.attributeValue + "</span><input class='form-control store-name hidden' type='text' value='" + data.attributeValue + "'/>";
                },
                "targets": 2
            },
            {
                "render": function (data) {
                    var className = "";
                    if (data.status === false) {
                        className = "error-cell";
                    }
                    return "<span class='" + className + "'>" + data.attributeValue + "</span><input class='form-control store-code hidden' type='text' value='" + data.attributeValue + "'/>";
                },
                "targets": 3
            },
            {
                "render": function (data) {
                    var className = "";
                    if (data.status === false) {
                        className = "error-cell";
                    }
                    return "<span class='" + className + "'>" + data.attributeValue + "</span><input class='form-control store-postal-code hidden' type='text' value='" + data.attributeValue + "'/>";
                },
                "targets": 4
            },
            {
                "render": function (data) {
                    var className = "";
                    if (data.status === false) {
                        className = "error-cell";
                    }
                    return "<span class='" + className + "'>" + data.attributeValue + "</span><input class='form-control store-smoking hidden' type='text' value='" + data.attributeValue + "'/>";
                },
                "targets": 5
            },
            {
                "render": function (data) {
                    var className = "";
                    if (data.status === false) {
                        className = "error-cell";
                    }
                    return "<span class='" + className + "'>" + data.attributeValue + "</span><input class='form-control store-phone hidden' type='number' value='" + data.attributeValue + "'/>";
                },
                "targets": 6
            },
            {
                "render": function (data) {
                    var className = "";
                    if (data.status === false) {
                        className = "error-cell";
                    }
                    return "<span class='" + className + "'>" + data.attributeValue + "</span><input class='form-control store-phone-2 hidden' type='number' value='" + data.attributeValue + "'/>";
                },
                "targets": 7
            },
            {
                "render": function (data) {
                    var className = "";
                    if (data.status === false) {
                        className = "error-cell";
                    }
                    return "<span class='" + className + "'>" + data.attributeValue + "</span><input class='form-control store-fax hidden' type='number' value='" + data.attributeValue + "'/>";
                },
                "targets": 8
            },
            {
                "render": function (data) {
                    var className = "";
                    if (data.status === false) {
                        className = "error-cell";
                    }
                    return "<span class='" + className + "'>" + data.attributeValue + "</span><input class='form-control store-fax-2 hidden' type='number' value='" + data.attributeValue + "'/>";
                },
                "targets": 9
            },
            {
                "render": function (data) {
                    var className = "";
                    if (data.status === false) {
                        className = "error-cell";
                    }
                    return "<span class='" + className + "'>" + data.attributeValue + "</span><input class='form-control store-fax-receive hidden' type='number' value='" + data.attributeValue + "'/>";
                },
                "targets": 10
            },
            {
                "render": function (id) {
                    return "<span class='btn btn-primary btn-sm edit-store'> <i class='fa fa-pencil-square-o fa-lg'></i> </span><input type='submit' data-id='" + id + "' class='update-store hidden form-control' value='変更'/> ";
                },
                "targets": 11
            }
        ],
        "drawCallback": function () {
            $(".edit-store").click(function (e) {
                e.preventDefault();
                var $tr = $(this).parent().parent();
                $tr.find("span").addClass("hidden");
                $tr.find("input").removeClass("hidden");
                $tr.find(".product-tag").removeClass("hidden");
                $tr.find(".product-tag span").removeClass("hidden");

                var oldId = $tr.find(".store-id").val();
                var oldCode = $tr.find(".store-code").val();
                var oldName = $tr.find(".store-name").val();
                $tr.data("oldId", oldId);
                $tr.data("oldCode", oldCode);
                $tr.data("oldName", oldName);
            });

            $(".update-store").click(function (e) {

                var $tr = $(this).parent().parent();
                var dataId = $(this).data("id");
                var store = xlsxStoreFileVerifyResult.newStoreVerifyResults[dataId];
                var store_id = $tr.find(".store-id").val();
                var store_code = $tr.find(".store-code").val();
                var store_name = $tr.find(".store-name").val();
                store.idAttr.attributeValue = store_id;
                store.codeAttr.attributeValue = store_code;
                store.nameAttr.attributeValue = store_name;
                store.no_smokingAttr.attributeValue = $tr.find(".store-smoking").val();
                store.postalCodeAttr.attributeValue = $tr.find(".store-postal-code").val();
                store.phoneAttr.attributeValue = $tr.find(".store-phone").val();
                store.phone2Attr.attributeValue = $tr.find(".store-phone-2").val();
                store.faxAttr.attributeValue = $tr.find(".store-fax").val();
                store.fax2Attr.attributeValue = $tr.find(".store-fax-2").val();
                store.faxReceiveAttr.attributeValue = $tr.find(".store-fax-receive").val();
                var oldId = $tr.data("oldId");
                var oldCode = $tr.data("oldCode");
                var oldName = $tr.data("oldName");
                if (store.codeAttr.attributeValue.length >= 10) {
                    window.alert.show("error", "店舗Noを10文字以内で入力してください。。", 2500);
                    return;
                }
                if (store.idAttr.attributeValue.length >= 10) {
                    window.alert.show("error", "店舗Idを10文字以内で入力してください。。", 2500);
                    return;
                }
                if (store.nameAttr.attributeValue.length >= 255) {
                    window.alert.show("error", "店舗名を255文字以内で入力してください。。", 2500);
                    return;
                }
                if (store.no_smokingAttr.attributeValue.toUpperCase() != "喫煙" && store.no_smokingAttr.attributeValue.toUpperCase() != "禁煙") {
                    window.alert.show("error", "喫煙または禁煙を選択ください", 2500);
                    return;
                }
                if (store_id != "" && xlsxStoreFileVerifyResult.storeIds.has(store_id) && store_id !== oldId && store_id !== "0") {
                    window.alert.show("error", "この店舗は存在しています。", 2500);
                    return;
                }
                if ((xlsxStoreFileVerifyResult.storeCodes.has(store_code) && store_code !== oldCode)  ) {
                    window.alert.show("error", "この店舗は存在しています。", 2500);
                    return;
                }
                if (xlsxStoreFileVerifyResult.storeNames.has(store_name) && store_name !== oldName) {
                    window.alert.show("error", "この店舗は存在しています。", 2500);
                    return;
                }
                if(checkExistStoreCode()){
                    window.alert.show("error", "この店舗コードは既に存在します。", 2500);
                    return;
                }

                if(checkExistStoreName()){
                    window.alert.show("error", "この店舗名は既に存在します", 2500);
                    return;
                }
                $.ajax({
                    type: "POST",
                    url: "/api/v1/web/" + appId + "/newStore/verifyNewStoreAttr",
                    data: JSON.stringify(store),
                    contentType: "application/json",
                    beforeSend: function () {
                        window.loader.show();
                    },
                    success: function (newResult) {
                        xlsxStoreFileVerifyResult.storeCodes.delete(oldCode);
                        xlsxStoreFileVerifyResult.storeIds.delete(oldId);
                        xlsxStoreFileVerifyResult.storeNames.delete(oldName);
                        xlsxStoreFileVerifyResult.storeCodes.add(store.code);
                        xlsxStoreFileVerifyResult.storeIds.add(store.id);
                        xlsxStoreFileVerifyResult.storeIds.add(store.name);
                        console.log(xlsxStoreFileVerifyResult);
                        var countNumError = 0;
                        var result = xlsxStoreFileVerifyResult.newStoreVerifyResults[dataId] = newResult;
                        xlsxStoreFileVerifyResult.newStoreVerifyResults.forEach(function (value) {
                            if (value.status == false) {
                                countNumError++;
                            }
                        });
                        xlsxStoreFileVerifyResult.numErrors = countNumError;
                        importStoreTable.ajax.reload();
                        window.loader.hide();

                    }
                });

            });
        }
    });

    function checkExistStoreName(){
        var array = [];
        var isExist = false;
        $(".store-name").each(function () {
            var val = $(this).val();
            if(!array.includes(val)){
                array.push(val);
            }
            else{
                isExist = true;
            }
        });
        return isExist;
    }

    function checkExistStoreCode(){
        var array = [];
        var isExist = false;
        $(".store-code").each(function () {
            var val = $(this).val();
            if(!array.includes(val)){
                array.push(val);
            }
            else{
                isExist = true;
            }
        });
        return isExist;
    }

    $(document).keypress(function (e) {
        if (e.which == 13) {
            var input = $("#input_coupon_tag").val();
            if (!input == '') {
                if (input.length >= 50) {
                    window.alert.show("error", "50文字以内で入力してください。", 1500);
                    return
                }
                if (validateCouponTag(input)) {
                    $('<span class="coupon-tag"><span>' + $("#input_coupon_tag").val() + '</span><i class="fa fa-remove delete-tag"></i></span>').insertBefore($("#input_coupon_tag"));
                    $("#input_coupon_tag").val('')
                } else {
                    window.alert.show("error", "このタグは既に存在します", 1500);
                }
            }
        }
    });
    $("#new_store_file_input").change(function (e) {
        e.preventDefault();
        if (this.files.length < 1) {
            return;
        }

        if (this.files[0].size > fileSize30MB) {
            window.alert.show("error", "ファイルの最大サイズは３0MBです。", 3000);
            return;
        }
        var formData = new FormData();
        formData.append("file", this.files[0]);

        window.loader.show();
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/newStore/verifyXLSXStoreFile",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            error: function () {
                window.loader.hide();
            },
            success: function (response) {
                window.loader.hide();
                if (response.status.code === 1020) {
                    window.alert.show("error", response.data, 2500);
                    return;
                }
                if (response.status.code === 1021) {
                    window.alert.show("error", response.data, 2500);
                    return;
                }
                xlsxStoreFileVerifyResult = response.data;
                xlsxStoreFileVerifyResult.storeCodes = new Set(response.data.storeCodes);
                xlsxStoreFileVerifyResult.storeIds = new Set(response.data.storeIds);
                xlsxStoreFileVerifyResult.storeNames = new Set(response.data.storeNames);
                $("#import_store_modal").modal();
                importStoreTable.ajax.reload();
            },
            error: function (response) {
                window.alert.show("error", "ファイル拡張が正しくないです。.XLSXをアップロードしてください。", "2000");
                window.loader.hide();
            }
        });
    });

    $("#submit_import_store").click(function () {
        if (xlsxStoreFileVerifyResult.numErrors > 0) {
            window.alert.show("error", "間違っている店舗情報を修正してください。 ", 2000);
            return;
        }
        // set storeId and storeCode to null, because cannot parse set to json
        xlsxStoreFileVerifyResult.storeIds = null;
        xlsxStoreFileVerifyResult.storeCodes = null;
        xlsxStoreFileVerifyResult.storeNames = null;

        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/newStore/import",
            data: JSON.stringify(xlsxStoreFileVerifyResult),
            beforeSend: function () {
                window.loader.show();
            },
            contentType: "application/json",
            success: function (response) {
                window.loader.hide();
                xlsxStoreFileVerifyResult = {
                    numErrors: 0,
                    storeVerifyResults: [],
                    storeCodes: [],
                    storeIds: []
                };
                window.alert.show("success", "XLSXインポートを設定しました。", 2000);
                setTimeout(function () {
                    location.reload();
                }, 2000)
            }
        });


    });
})