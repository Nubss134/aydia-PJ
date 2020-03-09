var newStoreEntity = {};
$(document).ready(function () {
    var appId = $("#app_id").val();
    var fileOptions = new Set();
    var tableOfCatalogs;

    // import file excel button click event
    $('#btn_import_excel').on('click', function () {
        $("#file_excel_input").click();
    });

    // event after choosing excel file
    $(document).on("change", "#file_excel_input", function (e) {
        // check file extension
        var fileExtension = ['xlsx', 'xls'];
        e.preventDefault();
        if (this.files.length < 1) {
            return;
        } // alert if not valid
        if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            window.alert.show("error", "ファイル拡張が正しくないです。.xls,.xlsx をアップロードしてください。", 3000);
            return;
        }
        //get data from file excel via server
        var formData = new FormData();
        formData.append("excelFile", this.files[0]);
        window.loader.show();
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/new_catalog/getListCatalogsFromExcel",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                window.loader.hide();
                fillTableCatalogOfModal(response)
                $("#modalCatalog").modal("show");
            },
            error: function (response) {
                window.alert.show("error", "エラーが発生しました。しばらく待ってからもう一度お試してください。", "2000");
                window.loader.hide();
            }
        });
        $('#file_excel_input').val(null);
    });

    // fill data from server to modal
    function fillTableCatalogOfModal(listCatalog) {
        if (tableOfCatalogs != null) {
            tableOfCatalogs.destroy();
        }
        var html = '';
        for (var i = 0; i < listCatalog.length; i++) {
            html += '<tr><td  class="flyerGroupName">' + listCatalog[i].flyerGroupName +
                '</td><td class="startDate">' + listCatalog[i].startDate +
                '</td><td class="finishDate">' + listCatalog[i].finishDate +
                '</td><td class="flyerTitle">' + listCatalog[i].flyerTitle +
                '</td><td class="storeCode">' + listCatalog[i].newStoreEntity.storeCode +
                '</td><td class="file-option-name" id="file_option_1">' + listCatalog[i].file_1_Name +
                '</td><td class="file-option-name" id="file_option_2">' + listCatalog[i].file_2_Name +
                '</td><td class="file-option-name" id="file_option_3">' + listCatalog[i].file_3_Name +
                '</td><td><button class="btn btn-hover btn-danger btn-sm btn-delete">削除</button></td></tr>';
        }
        $('#table_catalog tbody tr').remove();
        $('#table_catalog tbody').append(html);

        tableOfCatalogs = $('#table_catalog').DataTable({
            "language": {
                "url": "/libs/new_data_table/js/ja.json"
            },
            "lengthMenu": [
                [10, 20, 50],
                [10, 20, 50]
            ],
            "ordering": true,
            "searching": true,
        });
    }

    // import file option button click event
    $(document).on('click', '#btn_import_file_option', function (event) {
        $("#file_option_input").click();
    })

    // event after choosing optional file
    $("#file_option_input").change(function () {
        var fileExtension = ['png', 'jpg', 'pdf'];
        if (this.files.length < 1) {
            return;
        }
        if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            window.alert.show("error", "ファイル拡張が正しくないです。.JPG, .PNG をアップロードしてください。", 3000);
            return;
        }
        // if same name, prepend image/ pdf icon
        for (var i = 0; i < this.files.length; i++) {
            var currentFileInput = this.files[i];
            tableOfCatalogs.cells(".file-option-name").nodes().each(function (tag) {
                var fileNameFromExcel = $(tag).html();
                if (fileNameFromExcel === currentFileInput.name) {
                    fileOptions.add(currentFileInput);
                    if (fileNameFromExcel.substring(fileNameFromExcel.lastIndexOf('.') + 1) == 'pdf') {
                        $(tag).prepend('<i class="fa fa-file-pdf-o" style="font-size:24px; color:red"></i></br>')
                    } else {
                        $(tag).prepend('<img src="' + URL.createObjectURL(currentFileInput) + '"' + 'alt="' + fileNameFromExcel + '" style="width:42px; height:42px"></br>');
                    }
                }
            });
        }
        ;
        $('#file_option_input').val(null); // reset for binding change event second time
    });

    // save catalog button click event


    $(document).on('click', '#btn-save-catalog', function (event) {
        if(checkAllFileAreImported() != false){
            var formData = new FormData();
            if (fileOptions.size > 0) {
                fileOptions.forEach(function (element) {
                    formData.append("fileOptions", element);
                })
            }
            var listCatalogs = getListCatalogFromTable().listCatalogs;
            var arrayNewStore = getListCatalogFromTable().arrayNewStore;
            formData.append("listCatalogs", new Blob([JSON.stringify(listCatalogs)], {type: "application/json"}));
            formData.append("arrayNewStore", new Blob([JSON.stringify(arrayNewStore)], {type: "application/json"}));

            window.loader.show();
            $.ajax({
                type: "POST",
                url: "/api/v1/web/" + appId + "/new_catalog/saveListCatalogs",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    window.loader.hide();
                    window.alert.show("success", "保存しました。 ", 2000);
                    setTimeout(function () {
                        location.reload();
                    }, 1000)
                },
                error: function (response) {
                    window.alert.show("error", "エラーが発生しました。しばらく待ってからもう一度お試してください。", "2000");
                    window.loader.hide();
                }
            });
        }else{
            window.alert.show('error',"すべてのファイルをインポートしてください。",2000);
        }

    })

    function getListCatalogFromTable() {
        var listCatalogs = [];
        var arrayNewStore = [];
        tableOfCatalogs.rows().nodes().each(function (rowTable) {
            var catalog = {};
            catalog.flyerGroupName = $(rowTable).find(".flyerGroupName").text();
            catalog.flyerTitle = $(rowTable).find(".flyerTitle").text();
            catalog.startDate = $(rowTable).find(".startDate").text();
            catalog.finishDate = $(rowTable).find(".finishDate").text();
            catalog.file_1_Name = $(rowTable).find("#file_option_1").text();
            catalog.file_2_Name = $(rowTable).find("#file_option_2").text();
            catalog.file_3_Name = $(rowTable).find("#file_option_3").text();
            listCatalogs.push(catalog);
            arrayNewStore.push($(rowTable).find(".storeCode").text());
        });
        return {listCatalogs:listCatalogs,arrayNewStore : arrayNewStore};
    }

    function checkAllFileAreImported(){
        var count = 0;
        $(".file-option-name").each(function () {
            if($(this).children().length == 0){
                count ++;
            }
        })
        if(count == 0){
            return true;
        }else{
            return false;
        }
            
    }

    // import file option button click event
    $(document).on('click', '.btn-delete', function () {
        tableOfCatalogs.row($(this).parents("tr")).remove().draw();
    })
})
