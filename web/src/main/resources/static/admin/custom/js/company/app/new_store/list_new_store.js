var newStoreTable;
$(document).ready(function () {
    var appId = $("#app_id").val();
    var companyId = $("#company_id").val();

    var getStores = function (requestData, renderFunction) {
        var sortField = "storeName";
        var sortDir = requestData.order[0].dir;

        var params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": sortField,
            "sortDir": sortDir,
        };
        window.loader.show();

        jQuery.post("/api/v1/web/" + appId
            + "/newStore/list", params, function (response) {
            var content = {
                "draw": requestData.draw,
                "recordsTotal": response.totalElements,
                "recordsFiltered": response.totalElements,
                "data": response.content
            };
            renderFunction(content);
            window.loader.hide();
        });
    };

    var columnDefinitions = [
            {"data": "storeId", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
            {"data": "storeCode", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
            {"data": "storeName", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
            {"data": "numberClickUnique", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
            {"data": "listNewCatalog", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
            {"data": "address", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
            {"data": "storeId", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"}
        ]
    ;

    newStoreTable = $("#new_store_table").DataTable(
        {
            "language": {
                "url": "/libs/new_data_table/js/ja.json"
            },
            "lengthMenu": [[10, 20, 50], [10, 20, 50]],
            rowId: 'storeId',
            "ordering": true,
            "order": [[2, "asc"]],
            "serverSide": true,
            "bFilter": false,
            "bInfo": true,
            "bLengthChange": true,
            "columns": columnDefinitions,
            "ajax": function (requestParams, callback) {
                getStores(requestParams, callback);
            },
            "columnDefs": [
                {
                    "render": function (id) {
                        return '<label class="checkbox-container" style="display: inline-block; text-align: center"><input type="checkbox" class="check-store" value="' + id + '">' + '<span class="checkbox"></span></label>';
                    },
                    "targets": 0
                },
                {
                    "render": function (data) {
                        var result = "<div style='display: inline-block'>";
                        var curDate = new Date();
                        if (data.length == 0) {
                            result += "データなし"; //No data
                        }
                        var res1 = "";
                        data.forEach(function (catalog) {
                            var isActive = Date.parse(curDate) > Date.parse(catalog.startDate) && Date.parse(curDate) < Date.parse(catalog.finishDate);
                            if (isActive) {
                                if (catalog.file_1_Name != "" && catalog.file_1_Url) {
                                    if (catalog.file_1_Name.substring(catalog.file_1_Name.lastIndexOf('.') + 1) == 'pdf') {
                                        res1 += "<div style='width: 40px;display: inline-block; margin-bottom: 5px; margin-left: 10px;vertical-align: top'><a target='_blank' href='" + catalog.file_1_Url + "'><i class=\"fa fa-file-pdf-o\" style=\"font-size:40px; color:red\"></i><br>"+catalog.file_1_Name+"</a></div>";
                                    } else {
                                        res1 += "<div style='display: inline-block;margin-bottom: 5px; margin-left: 10px;vertical-align: top'><a target='_blank' href='" + catalog.file_1_Url + "'><img style='width: 40px;height: 40px' src='" + catalog.file_1_Url + "' /><br>"+catalog.file_1_Name+"</a></div>";
                                    }
                                }
                                if (catalog.file_2_Name != "" && catalog.file_2_Url) {
                                    if (catalog.file_2_Name.substring(catalog.file_2_Name.lastIndexOf('.') + 1) == 'pdf') {
                                        res1 += "<div style='width: 40px;display: inline-block;margin-bottom: 5px; margin-left: 10px;vertical-align: top'><a target='_blank' href='" + catalog.file_2_Url + "'><i class=\"fa fa-file-pdf-o\" style=\"font-size:40px; color:red\"></i><br>"+catalog.file_2_Name+"</a></div>";
                                    } else {
                                        res1 += "<div style='display: inline-block;margin-bottom: 5px; margin-left: 10px;vertical-align: top'><a target='_blank' href='" + catalog.file_2_Url + "'><img style='width: 40px;height: 40px' src='" + catalog.file_2_Url + "' /><br>"+catalog.file_2_Name+"</a></div>";
                                    }
                                }
                                if (catalog.file_3_Name != "" && catalog.file_3_Url) {
                                    if (catalog.file_3_Name.substring(catalog.file_3_Name.lastIndexOf('.') + 1) == 'pdf') {
                                        res1 += "<div style='width: 40px;display: inline-block;margin-bottom: 5px; margin-left: 10px;vertical-align: top'><a target='_blank' href='" + catalog.file_3_Url + "'><i class=\"fa fa-file-pdf-o\" style=\"font-size:40px; color:red\"></i><br>"+catalog.file_3_Name+"</a></div>";
                                    } else {
                                        res1 += "<div style='display: inline-block;margin-bottom: 5px; margin-left: 10px;vertical-align: top'><a target='_blank' href='" + catalog.file_3_Url + "'><img style='width: 40px;height: 40px' src='" + catalog.file_3_Url + "' /><br>"+catalog.file_3_Name+"</a></div>";
                                    }
                                    res1 += "</br>";
                                }

                            }

                        });
                        if(res1 == ""){
                            result += "データなし"; //No data
                        }else{
                            result += res1;
                        }
                        return result + "</div>";
                    },
                    "targets": 4
                },
                {
                    "render": function (data) {
                        return '<div style="width: 80%;display: inline-block"><span style="float:left">' + data + '</span><button class="btn btn-primary btn-sm view-location" style="float:right; font-size: 8px">場所を見る</button></div>';
                    },
                    "targets": 5
                },
                {
                    "render": function (data) {
                        return '<button style="margin-right: 5px; font-size: 8px" id="' + 'btn_update_' + data + '" class="btn btn-primary btn-sm btn-update update-store-btn"  ' + 'role="button" data-id="' + data + '" data-toggle="modal" data-target="#modal_update_coupon">店舗を更新する</button>'
                              + '<button style="margin-right: 5px; font-size: 8px" class="btn btn-primary btn-sm btn-download-member-click" id="btn_download_member_click_' + data + '" >ダウンロード</button>'
                              + '<button style="margin-right: 5px; font-size: 8px" id="' + 'btn_edit_catalog_' + data + '" class="btn btn-primary btn-sm" data-id="' + data + '"data-toggle="modal" data-target="#edit_catalog_modal">カタログ一覧</button>'
                              + '<button style="margin-right: 5px; font-size: 8px" id="' + 'btn_statistic_' + data + '" class="btn btn-primary btn-sm statistic-store-btn" data-id="' + data + '">気に入りユーザー一覧</button>'
                              + '<button style="font-size: 8px" id="' + 'btn_delete_' + data + '" class="btn btn-danger btn-sm delete-store-btn"  data-id="' + data + '" data-toggle="modal" data-target="#modal_delete_coupon">削除</button>'
                    },
                    "targets": 6
                },
            ],
            "drawCallback": function () {
                $("#select_all").prop("checked", false)
                $(".update-store-btn").click(function () {
                    AddStore.saveStoreModal.initTagSelect(AddStore.saveStoreModal);
                    var id = $(this).data("id");
                    AddStore.saveStoreModal.getPosition( $("#address").val() + " " + $("#district").val() + " " + $("#city").val(),function (position) {

                    });
                    window.loader.show();
                    $.get("/api/v1/web/" + appId + "/newStore/detail/" + id, {}, function (store) {
                        window.loader.hide();
                        AddStore.saveStoreModal.setStore(store);
                        AddStore.saveStoreModal.show();
                    });
                });



                $(".view-location").on('click', function () {
                    var options = {
                        zoom: 15,
                        animation: google.maps.Animation.DROP,
                        mapTypeId: google.maps.MapTypeId.ROADMAP

                    };

                    var map = new google.maps.Map(document.getElementById("store_location_on_map"), options);
                    var address = $(this).prev().text();
                    var geocoder = new google.maps.Geocoder();
                    var marker = new google.maps.Marker({
                        map: map,
                        draggable: true,
                    });
                    geocodeAddress(address, geocoder, map);
                    $("#location-new-store").modal('show');
                });

            }
        });
    $(document).on("click", ".delete-store-btn", function () {
        var id = $(this).data("id");
        $("#delete_entity_id").val(id);
        $("#delete_store_modal").modal();
    })

    $(document).on('click', ".btn-download-member-click", function () {
        var storeId = $(this).attr("id").replace("btn_download_member_click_","");
        var href = "/api/v1/web/" + appId + "/newStore/downloadMemberClickStoreCSV/" + storeId;
        window.location.href = href;
    });


    function geocodeAddress(address, geocoder, resultsMap) {
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            }
        });
    }

    $("#btn_submit_delete").click(
        function (e) {
            e.preventDefault();
            var storeId = $("#delete_entity_id").val();
            $.ajax({
                type: "DELETE",
                url: "/api/v1/web/" + appId + "/newStore/delete?id=" + storeId,
                beforeSend: function () {
                    window.loader.show();
                },
                success: function () {
                    window.loader.hide();
                    $("#delete_store_modal").modal("hide");
                    window.alert.show("success", "店舗を削除しました。 ", 1200);
                    newStoreTable.ajax.reload();
                }
            });
        });

    $("#select_all").click(
        function () {
            if ($(this).is(':checked')) {
                $("#new_store_table input[type='checkbox']")
                    .prop("checked", true);
            } else {
                $("#new_store_table input[type='checkbox']")
                    .prop("checked", false);
            }
        });

    $(document).on("click", ".statistic-store-btn", function () {
        var storeId = $(this).data("id");
        var url = "/company/" + companyId + "/app/" + appId + "/newStore/statistic?store=" + storeId;
        window.open(url)
    })

})