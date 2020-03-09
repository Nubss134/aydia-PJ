var catalogStoreTable;
$(document).ready(function () {
    function log(message) {
        console.log(message);
    }

    var appId = $("#app_id").val();
    var storeId = 1;

    var columnDefinitionsCatalogStore = [
        {"data": "flyerGroupName", "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "flyerTitle", "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "startDate", "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "finishDate", "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": null, "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": null, "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": null, "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "id", "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"},
    ];

    var getData = function (requestData, renderFunction, url, columnDefinitions) {
        var sortField = columnDefinitions[requestData.order[0].column].data;
        var sortDir = requestData.order[0].dir;
        var params = {
            "page": (requestData.start / requestData.length) + 1,
            "size": requestData.length,
            "sortField": sortField,
            "sortDir": sortDir
        };
        jQuery.get(url, params, function (response) {
            var content = {
                "draw": requestData.draw,
                "recordsTotal": response.totalElements,
                "recordsFiltered": response.totalElements,
                "data": response.content
            };
            renderFunction(content);
        });
    };
    catalogStoreTable = $("#table_catalog_edit").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [10, 20, 50],
            [10, 20, 50]
        ],

        "searching": false,
        rowId: 'id',
        "ordering": true,
        "order": [1, "desc"],
        "pagingType": "full_numbers",
        "serverSide": true,
        "columns": columnDefinitionsCatalogStore,
        "ajax": function (data, callback) {
            getData(data, callback, "/api/v1/web/" + appId + "/new_catalog/getListCatalogByStoreId/" + storeId, columnDefinitionsCatalogStore);
        },
        columnDefs: [
            {
                "render": function (data) {
                    var result = "";
                    if (data.file_1_Name != null) {
                        if (data.file_1_Name.substring(data.file_1_Name.lastIndexOf('.') + 1) == 'pdf') {
                            result += ('<a target="_blank" href="'+data.file_1_Url+'"><i class="fa fa-file-pdf-o" style="font-size:39px; color:red"></i></br>');
                        } else {
                            result += '<a target="_blank" href="'+data.file_1_Url+'"><img src="' + data.file_1_Url + '"' + 'alt="' + data.file_1_Url + '" style="width:42px; height:42px"></br>';
                        }
                        result += data.file_1_Name +"</a>";
                    } else {
                        result = "データなし";
                    }
                    return result;
                },
                "targets": 4
            },
            {
                "render": function (data) {
                    var result = "";
                    if (data.file_2_Name != null) {
                        if (data.file_2_Name.substring(data.file_2_Name.lastIndexOf('.') + 1) == 'pdf') {
                            result += ('<a target="_blank" href="'+data.file_2_Url+'"><i class="fa fa-file-pdf-o" style="font-size:39px; color:red"></i></br>');
                        } else {
                            result += '<a target="_blank" href="'+data.file_2_Url+'"><img src="' + data.file_2_Url + '"' + 'alt="' + data.file_2_Url + '" style="width:42px; height:42px"></br>';
                        }
                        result += data.file_2_Name +"</a>";
                    } else {
                        result = "データなし";
                    }
                    return result;
                },
                "targets": 5
            },
            {
                "render": function (data) {
                    var result = "";
                    if (data.file_3_Name != null) {
                        if (data.file_3_Name.substring(data.file_3_Name.lastIndexOf('.') + 1) == 'pdf') {
                            result += ('<a target="_blank" href="'+data.file_3_Url+'"><i class="fa fa-file-pdf-o" style="font-size:39px; color:red"></i></br>');
                        } else {
                            result += '<a target="_blank" href="'+data.file_3_Url+'"><img src="' + data.file_3_Url + '"' + 'alt="' + data.file_3_Url + '" style="width:42px; height:42px"></br>';
                        }
                        result += data.file_3_Name +"</a>";
                    } else {
                        result = "データなし";
                    }
                    return result;
                },
                "targets": 6
            },
            {
                "render": function (data) {
                    return '<button style="margin-right: 10px" id="btn-update-catalog' + data + '" class="btn btn-hover btn-primary btn-sm btn-update-catalog">詳細</button>' +
                        '<button id="btn-del-catalog' + data + '" class="btn btn-hover btn-danger btn-sm btn-delete-catalog">削除</button>';
                },
                "targets": 7
            },
        ],
        "drawCallback": function (nRow, aData) {
            $(document).on('click', '.btn-update-catalog', function () {
                var catalog_id = $(this).attr("id").replace("btn-update-catalog", "");
                $("#catalog_id").val(catalog_id);
                $.ajax({
                    type: "GET",
                    url: "/api/v1/web/" + appId + "/new_catalog/getCatalogDetail/" + catalog_id,
                    success: function (response) {
                        if (response.status.code == 1000) {
                            catalogVue.resetForm();
                            catalogVue.updateForm(response.data);
                            $("#table-catalog-store").prop("hidden", true);
                            $("#form_add_catalog").attr("hidden", false);
                        } else if (response.status.code == 4) {
                            window.alert.show('error', response.status.message, 2000);
                        }
                    }
                })

            });
            $(document).on('click', '.btn-delete-catalog', function () {
                var catalog_id = $(this).attr("id").replace("btn-del-catalog", "");
                $.ajax({
                    type: "GET",
                    url: "/api/v1/web/" + appId + "/new_catalog/deleteCatalogByStoreId/" + catalog_id,
                    success: function (response) {
                        if (response.status.code == 1000) {
                            catalogStoreTable.ajax.reload();
                            window.alert.show('success', "削除しました。", 2000);
                        } else if (response.status.code == 4) {
                            window.alert.show('error', "削除できませんでした。", 2000);
                        }
                    }
                })
            });
        }
    });
    $(document).on("click", "#back_to_list_catalog", function () {
        //show list catalog
        $("#table-catalog-store").prop("hidden", false);
        $("#form_add_catalog").attr("hidden", true);
    })
    $("#btn-add-catalog-store").click(function () {
        //show form add catalog
        $("#table-catalog-store").prop("hidden", true);
        $("#form_add_catalog").attr("hidden", false);
        catalogVue.resetForm();
    })

    $(document).on("click", ".edit_catalog_store", function () {
        storeId = $(this).data("id");
        $("#store_id_hidden").val(storeId);
        //show list catalog
        $("#table-catalog-store").prop("hidden", false);
        $("#form_add_catalog").attr("hidden", true);
        catalogVue.resetForm();
        catalogStoreTable.ajax.reload();
    });

    $('#edit_catalog_modal').on('hidden.bs.modal', function () {
        newStoreTable.ajax.reload();
    })


})
