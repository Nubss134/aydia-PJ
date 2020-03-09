var catalogVue;
$(document).ready(function () {
    var appId = $("#app_id").val();
    catalogVue = new Vue({
        el: "#form_add_catalog",
        data: {
            validGroupTitle: true,
            validTitle: true,
            validStartTime: true,
            validEndTime: true,
            validTime: true,
            validAllFileImported: true,
            isUpdate: false,
            files: [],

            messageValidGroupTitile: "このフィールドは必須です。",
            messageValidTitle: "このフィールドは必須です。",
            messageValidStartTime: "このフィールドは必須です。",
            messageValidEndTime: "このフィールドは必須です。",
            messageValidTime: "開始時間は終了時間より早くしてください。",
            messageValidAllFileImported: "最低の一つファイルをインポートしてください。",
        },
        mounted: function () {
            configDateRangerPickerNotMinDate('start_time_catalog');
            configDateRangerPickerNotMinDate('end_time_catalog');

        },
        methods: {
            resetForm: function () {
                this.isUpdate = false;
                $("#catalog_id").val("");
                $("#group_title_catalog").val("");
                $("#title_catalog").val("");
                $("#start_time_catalog").val("");
                $("#end_time_catalog").val("");
                this.files = [];
                $("#container_selected_file1").html("");
                $("#container_selected_file2").html("");
                $("#container_selected_file3").html("");

            },
            validateTitle: function () {
                var note = $("#title_catalog").val();
                if (note === null || note === undefined || note.trim() === "") {
                    this.validTitle = false;
                } else {
                    this.validTitle = true;
                }
            },
            validateStartTime: function () {
                var note = $("#start_time_catalog").val();
                if (note === null || note === undefined || note.trim() === "") {
                    this.validStartTime = false;
                } else {
                    this.validStartTime = true;
                }
            },
            validateEndTime: function () {
                var note = $("#end_time_catalog").val();
                if (note === null || note === undefined || note.trim() === "") {
                    this.validEndTime = false;
                } else {
                    this.validEndTime = true;
                }
            },
            validateAllFileAreImported: function () {
                if ((this.files.length > 0 && this.files.length < 4) || this.isUpdate ) {
                    this.validAllFileImported = true;
                } else {
                    this.validAllFileImported = false;
                }
            },
            validateTime: function () {
                var end_date = $("#end_time_catalog").val();
                var start_date = $("#start_time_catalog").val();
                if (end_date < start_date) {
                    this.validTime = false;
                } else {
                    this.validTime = true;
                }
            },
            validateGroupTitle: function () {
                var note = $("#group_title_catalog").val();
                if (note === null || note === undefined || note.trim() === "") {
                    this.validGroupTitle = false;
                } else {
                    this.validGroupTitle = true;
                }
            },
            validateForm: function () {
                this.validateGroupTitle();
                this.validateTitle();
                this.validateStartTime();
                this.validateEndTime();
                this.validateTime();
                this.validateAllFileAreImported();

                return this.validGroupTitle && this.validTitle && this.validStartTime && this.validEndTime && this.validTime && this.validAllFileImported;
            },
            updateForm: function (catalog) {
                this.isUpdate = true;

                $("#catalog_id").val(catalog.id);
                $("#group_title_catalog").val(catalog.flyerGroupName);
                $("#title_catalog").val(catalog.flyerTitle);
                $("#start_time_catalog").val(catalog.startDate);
                $("#end_time_catalog").val(catalog.finishDate);

                if (catalog.file_1_Name != null) {
                    if (catalog.file_1_Name.substring(catalog.file_1_Name.lastIndexOf('.') + 1) == 'pdf') {
                        $("#container_selected_file1").prepend('<i class="fa fa-file-pdf-o" style="font-size:79px; color:red"></i><i class="fa fa-times-circle fa-lg  btn-remove-file-catalog" ></i></br>' + catalog.file_1_Name)
                    } else {
                        $("#container_selected_file1").prepend('<img src="' + catalog.file_1_Url + '"' + 'alt="' + catalog.file_1_Name + '" style="width :37%;height: 78px"><i class="fa fa-times-circle fa-lg  btn-remove-file-catalog" ></i></br>' + catalog.file_1_Name);
                    }
                }
                if (catalog.file_2_Name != null) {
                    if (catalog.file_2_Name.substring(catalog.file_2_Name.lastIndexOf('.') + 1) == 'pdf') {
                        $("#container_selected_file2").prepend('<i class="fa fa-file-pdf-o" style="font-size:79px; color:red"></i><i class="fa fa-times-circle fa-lg  btn-remove-file-catalog" ></i></br>' + catalog.file_2_Name)
                    } else {
                        $("#container_selected_file2").prepend('<img src="' + catalog.file_2_Url + '"' + 'alt="' + catalog.file_2_Name + '" style="width :37%;height: 78px"><i class="fa fa-times-circle fa-lg  btn-remove-file-catalog" ></i></br>' + catalog.file_2_Name);
                    }
                }
                if (catalog.file_3_Name != null) {

                    if (catalog.file_3_Name.substring(catalog.file_3_Name.lastIndexOf('.') + 1) == 'pdf') {
                        $("#container_selected_file3").prepend('<i class="fa fa-file-pdf-o" style="font-size:79px; color:red"></i><i class="fa fa-times-circle fa-lg  btn-remove-file-catalog" ></i></br>' + catalog.file_3_Name)
                    } else {
                        $("#container_selected_file3").prepend('<img src="' + catalog.file_3_Url + '"' + 'alt="' + catalog.file_3_Name + '" style="width :37%;height: 78px"><i class="fa fa-times-circle fa-lg  btn-remove-file-catalog" ></i></br>' + catalog.file_3_Name);
                    }
                }
            },
            addOrUpdate: function (e) {
                e.preventDefault();
                var self = this;

                var list_delete_catalog_image = [];
                if (this.validateForm()) {
                    var formData = new FormData();
                    if (this.isUpdate == true) {
                        $(".image-file-attach").each(function () {
                            if ($(this).html() == "") {
                                list_delete_catalog_image.push($(this).attr('id').replace("container_selected_file", ""));
                            }
                        });
                    }
                    var catalog = {
                        "id": $("#catalog_id").val(),
                        "flyerGroupName": $("#group_title_catalog").val(),
                        "listDeleteCatalogImage" : list_delete_catalog_image,
                        "flyerTitle": $("#title_catalog").val(),
                        "startDate": $("#start_time_catalog").val(),
                        "finishDate": $("#end_time_catalog").val(),
                        "newStoreEntity": {
                            "storeId": $("#store_id_hidden").val()
                        }
                    };
                    formData.append("catalogDto", new Blob([JSON.stringify(catalog)], {
                        type: "application/json"
                    }));
                    this.files.forEach(function (element, index) {
                        formData.append("fileCatalogs", element, element.name + (index + 1));
                    });


                    window.loader.show();
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/new_catalog/addOrUpdateCatalog/",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            window.loader.hide();
                            if (response.status.code == 1000) {
                                window.alert.show('success', "変更しました", 2000);
                                $("#table-catalog-store").prop("hidden", false);
                                $("#form_add_catalog").attr("hidden", true);
                                catalogStoreTable.ajax.reload();
                                newStoreTable.ajax.reload();
                            } else {
                                window.alert.show('error', response.status.message, 2000);
                                return;
                            }
                        },
                        error: function (res) {
                            window.loader.hide();
                            window.alert.show('error', response.status.message, 2000);
                            return;
                        }
                    })
                }
            }
        },


    });
    $("#btn_upload_file1").click(function () {
        $("#upload_file_input1").click();
    })

    $("#btn_upload_file2").click(function () {
        $("#upload_file_input2").click();
    })

    $("#btn_upload_file3").click(function () {
        $("#upload_file_input3").click();
    })

    $('input[class~="file-input-catalog"]').change(function (e) {
        if (e.target.files[0] != undefined) {
            var number_input = $(this).attr("id").replace("upload_file_input", "");
            var container = "#container_selected_file" + number_input;

            //clear input
            $(container).html("");
            catalogVue.files[number_input - 1] = e.target.files[0];
            var fileExtension = ['png', 'jpg', 'pdf'];
            var fileName = e.target.files[0].name;
            if ($.inArray(fileName.split('.').pop().toLowerCase(), fileExtension) == -1) {
                window.alert.show("error", "ファイル拡張が正しくないです。.JPG, .PNG をアップロードしてください。", 3000);
                return;
            }

            if (fileName.substring(fileName.lastIndexOf('.') + 1) == 'pdf') {
                $(container).prepend('<i class="fa fa-file-pdf-o" style="font-size:79px; color:red"></i><i class="fa fa-times-circle fa-lg  btn-remove-file-catalog" ></i></br>' + fileName)
            } else {
                $(container).prepend('<img src="' + URL.createObjectURL(e.target.files[0]) + '"' + 'alt="' + fileName + '" style="width :37%;height: 78px"><i class="fa fa-times-circle fa-lg  btn-remove-file-catalog" ></i></br>' + fileName);
            }
        }

    })

    $(document).on('click', ".btn-remove-file-catalog", function () {
        var number = $(this).parent().attr('id').replace("container_selected_file", "");
        $(this).parent().parent().find("input").removeAttr("value");
        catalogVue.files[number - 1] = {};
        $(this).parent().html("");
    })
})
;