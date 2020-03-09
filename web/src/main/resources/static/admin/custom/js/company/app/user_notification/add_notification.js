var AddNotification = {};
$(document).ready(function () {
    var appId = $("#app_id").val();
    var format = "YYYY/MM/DD HH:mm";
    var add_notification = new Vue({
        el: "#modal_add_notification",
        data: {
            validStartTime: true,
            // validEndTime: true,
            validTime: true,
            validTitle: true,
            validTitleLength: true,
            validDescription: true,
            validDescriptionLength: true,
            validContent: true,
            validContentLength: true,
            validWebLink: true,
            validCsvFile: true,
            isClearImage: false,
//	        	invalidImageMessage: "このフィールドは必須です。",
            invalidStartTimeMessage: "このフィールドは必須です。",
            //invalidEndTimeMessage: "このフィールドは必須です。",
            invalidTimeMessage: "開始時間は終了時間より早くしてください。",
            invalidTitleMessage: "このフィールドは必須です。",
            invalidTitleLengthMessage: "100 文字以内で入力してください。",
            invalidDescriptionMessage: "このフィールドは必須です。",
            invalidDescriptionLengthMessage: "500 文字以内で入力してください。",
            invalidContentMessage: "このフィールドは必須です。",
            invalidContentLengthMessage: "5000 文字以内で入力してください。",
            invalidWebLinkMessage: "このフィールドは必須です。",
            invalidCsvFileMessage: "このフィールドは必須です。",
            notificationType: 0,
            typeSendNoti: 1,//all
            typeNoti: 1, //open detail,  2: open app funcrion, 3: open webview	
            csvFile: null,
            csvFileName: null,
            id: null,
            toNumberUser: 0,
            numberUserFound: 0,
        },
        methods: {
            updateForm: function (notification) {
                console.log(notification)
                var self = this;
                if (notification.type !== 1) {
                    self.notificationType = 0;
                    $("#normal_noti").prop("checked", true);
                    $("#content_color").addClass("hidden");
                    $("#title_wrapper").addClass("col-md-12");
                    $("#title_wrapper").removeClass("col-md-8");
                } else {
                    self.notificationType = 1;
                    $("#important_noti").prop("checked", true);
                    $("#content_color").removeClass("hidden");
                    $("#title_wrapper").removeClass("col-md-12");
                    $("#title_wrapper").addClass("col-md-8");
                    $(".list-block .block-color").each(function () {
                        var color = rgb2hex($(this).find("label").css("background-color"));
                        if (color == notification.color) {
                            $(".main-block .block-color span,.main-block .block-color label").remove();
                            $(".main-block .block-color").append($(this).html());
                        }
                    })
                }
                $("#start_time").val(notification.startTime);
                if (notification.endTime.includes("9999")) {
                    $("#end_time").val("無期限");
                } else {
                    $("#end_time").val(notification.endTime);
                }
                setStartDateForDatePicker("start_time");
                setStartDateForDatePicker("end_time");

                if (notification != null && notification !== '' && notification.imageUrl != null && notification.imageUrl != '') {
                    $(self.$refs['user_notification_image'].$el).find("img").attr("src", notification.imageUrl);
                    self.$refs['user_notification_image'].hasImage = true;
                }
                $("#title").val(notification.title);
                $("#short_content").val(notification.shortContent);
                $("#link_webview_input").val(notification.linkWebview);
                this.typeSendNoti = notification.typeSendNoti;
                this.toNumberUser = notification.toNumberUser;
                this.csvFileName = notification.csvFileName;
                this.typeNoti = notification.typeNoti;
                this.id = notification.id;
                CKEDITOR.instances['content'].setData(notification.content);
                if (notification.typeNoti == 1) {
                    $("input[name='type_noti'][value='1']").prop('checked', true);
                    $("#list_function").addClass("hidden");
                    $("#content_noti").removeClass("hidden");
                    $("#webview_form_group").addClass("hidden");
                }
                if (notification.typeNoti == 2) {
                    $("input[name='type_noti'][value='2']").prop('checked', true);
                    $("#select_list_function option[id='function" + notification.menuEntity.id + "']").prop('selected', true);
                    $("#content_noti").addClass("hidden");
                    $("#list_function").removeClass("hidden");
                    $("#webview_form_group").addClass("hidden");
                }
                if (notification.typeNoti == 3) {
                    $("input[name='type_noti'][value='3']").prop('checked', true);
                    $("#list_function").addClass("hidden");
                    $("#content_noti").addClass("hidden");
                    $("#webview_form_group").removeClass("hidden");
                }
                if (notification.typeSendNoti == 1) {
                    $("#send_all").prop("checked", true);
                    $("#link_download_template_csv").addClass("hidden");
                    $("#csv_file_group").addClass("hidden");
                } else {
                    $("#send_by_file").prop("checked", true);
                    $("#link_download_template_csv").removeClass("hidden");
                    $("#csv_file_group").removeClass("hidden");
                    $("#csv_file span").html(notification.csvFileName);
                }

            },
            resetForm: function () {
                $("#start_time").val(moment().format(format));
                $("#end_time").val(" ");
                $("#short_content").val("");
                $("#title").val("");
                $("#link_webview_input").val("");
                CKEDITOR.instances['content'].setData("");
//	                this.validImage= true;
                this.validStartTime = true;
                this.validEndTime = true;
                this.validTime = true;
                this.validTitle = true;
                this.validTitleLength = true;
                this.validDescription = true;
                this.validDescriptionLength = true;
                this.validContent = true;
                this.validContentLength = true;
                this.validWebLink = true;
                this.typeSendNoti = 1;
                this.typeNoti = 1;
                this.validCsvFile = true;
                this.csvFile = null;
                this.csvFileName = null;
                this.id = null;
                $("#csv_file span").html('ファイルアップロード');
                this.numberUserFound = 0;
                this.$refs['user_notification_image'].hasImage = false;
            },
            validateNormalForm: function () {

//	            this.validateImage();
                this.validateStartTime();
                this.validateTime();
                this.validateTitle();
                this.validateTitleLength();
                this.validateDescription();
                this.validateDescriptionLength();
                this.validateContent();
                this.validateContentLength();
                this.validateWebLink();
                this.validateCsvFile();
                return this.validTitle && this.validTitleLength &&
                    this.validDescription && this.validDescriptionLength &&
                    this.validStartTime && this.validTime &&
                    this.validContent && this.validContentLength && this.validWebLink && this.validCsvFile;
            },
            validateImportantForm: function () {
//	            	this.validateImage();
                this.validateStartTime();
                this.validateTime();
                this.validateTitle();
                this.validateTitleLength();
                this.validateDescription();
                this.validateDescriptionLength();
                this.validateContent();
                this.validateContentLength();
                this.validateWebLink();
                this.validateCsvFile();
                return this.validTitle && this.validTitleLength &&
                    this.validDescription && this.validDescriptionLength &&
                    this.validStartTime && this.validTime &&
                    this.validContent && this.validContentLength && this.validWebLink && this.validCsvFile;
            },
            validateStartTime: function () {
                var startTime = $("#start_time").val();
                if (startTime === null || startTime === undefined || startTime.trim() === "") {
                    this.validStartTime = false;
                } else {
                    this.validStartTime = true;
                }
            },
            validateTime: function () {
                if ($("#end_time").val() != null && $("#end_time").val() != " " && $("#end_time").val() != "") {
                    var startTime = $("#start_time").val().replace("-", "");
                    var endTime = $("#end_time").val().replace("-", "");
                    if (startTime >= endTime) {
                        this.validTime = false;
                    } else {
                        this.validTime = true;
                    }
                } else {
                    this.validTime = true;
                }
            },
            validateTitle: function () {
                var name = $("#title").val();
                if (name === null || name === undefined || name.trim() === "") {
                    this.validTitle = false;
                } else {
                    this.validTitle = true;
                }
            },
            validateTitleLength: function () {
                var name = $("#title").val();
                if (name.length >= 100) {
                    this.validTitleLength = false;
                } else {
                    this.validTitleLength = true;
                }
            },
            validateDescription: function () {
                var description = $("#short_content").val();
                if (description === null || description === undefined || description.trim() === "") {
                    this.validDescription = false;
                } else {
                    this.validDescription = true;
                }
            },
            validateDescriptionLength: function () {
                var description = $("#short_content").val();
                if (description.length >= 500) {
                    this.validDescriptionLength = false;
                } else {
                    this.validDescriptionLength = true;
                }
            },
            validateContent: function () {
                var typeNoti = $("input[name='type_noti']:checked").val();
                if (typeNoti === "1") {
                    var content = CKEDITOR.instances['content'].getData();
                    if (content === null || content === undefined || content.trim() === "") {
                        this.validContent = false;
                    } else {
                        this.validContent = true;
                    }
                }
            },
            validateContentLength: function () {
                var typeNoti = $("input[name='type_noti']:checked").val();
                if (typeNoti === "1") {
                    var content = CKEDITOR.instances['content'].getData();
                    if (content.length >= 5000) {
                        this.validContentLength = false;
                    } else {
                        this.validContentLength = true;
                    }
                }
            },
            validateWebLink: function () {
                if (this.typeNoti == 3) {
                    var value = $("#link_webview_input").val();
                    if (value.length != 0) {
                        this.validWebLink = true;
                        if (value.length > 500) {
                            this.validWebLinkLength = false;
                        } else {
                            this.validWebLinkLength = true;
                        }
                    } else {
                        this.validWebLink = false;
                    }
                } else {
                    this.validWebLink = true;
                    this.validWebLinkLength = true;
                }
            },
            validateCsvFile: function () {
                if (this.typeSendNoti == 1) {
                    this.validCsvFile = true;
                } else {
                    if (this.csvFile != null || this.csvFileName != null) {
                        this.validCsvFile = true;
                    } else {
                        this.validCsvFile = false;
                    }
                }
            },
            addNotification: function (e) {
                var self = this;
                e.preventDefault();
                if (this.notificationType == 0) {
                    if (this.validateNormalForm()) {
                        var endTime;
                        if ($("#end_time").val != null && $("#end_time").val() != " " && $("#end_time").val() != "" && $("#end_time").val() != "無期限") {
                            endTime = moment($("#end_time").val()).format(format);
                        } else {
                            endTime = "9999/01/01 00:00";
                        }
                        var applicationNotificationEntity = {
                            id: this.id,
                            type: 0,
                            typeNoti: $("input[name='type_noti']:checked").val(),
                            typeSendNoti: this.typeSendNoti,
                            title: $("#title").val(),
                            shortContent: $("#short_content").val(),
                            content: CKEDITOR.instances["content"].getData(),
                            linkWebview: $("#link_webview_input").val(),
                            startTime: moment($("#start_time").val()).format(format),
                            endTime: endTime,
                            createdTime: moment(new Date()).format(format),
                            menuEntity: {id: $("#list_function option:selected").attr('id').replace("function", "")},
                            toNumberUser: this.toNumberUser,
                            csvFileName: this.csvFileName,
                            status: 1,
                        }
                        var formData = new FormData();
                        formData.append("image", this.$refs['user_notification_image'].getSelectedFile());
                        formData.append("csvFile", this.csvFile);
                        formData.append("isClearImage", new Blob([this.isClearImage], {
                            type: "application/json"
                        }));
                        formData.append("applicationNotificationEntity", new Blob([JSON.stringify(applicationNotificationEntity)], {
                            type: "application/json"
                        }));
                        $("#btn_submit_add").prop("disabled", true);
                        $.ajax({
                            type: "POST",
                            url: "/api/v1/web/" + appId + "/notification/create",
                            data: formData,
                            processData: false,
                            contentType: false,
                            headers: {
                                "Content-Type": undefined
                            },
                            beforeSend: function () {
                                window.loader.show();
                            },
                            success: function (response) {
                                window.loader.hide();
                                if (response.status.code === 4) {
                                    window.alert.show("error", "作成できません。 ", 1200);
                                } else {
                                    window.alert.show("success", "作成しました。 ", 1200);
                                    setTimeout(function () {
                                        location.reload();
                                    }, 1200)
                                }
                            }
                        });
                    }
                } else {
                    if (this.validateImportantForm()) {
                        notificationId = $("#notification_id").val();
                        var formData = new FormData();
                        formData.append("type", 1);
                        formData.append("image", self.$refs['user_notification_image'].getSelectedFile());
                        formData.append("title", $("#title").val());
                        formData.append("color", rgb2hex($(".main-block .block-color label").css("background-color")))
                        formData.append("startTime", moment($("#start_time").val()).format(format));
                        if ($("#end_time").val != null && $("#end_time").val() != " " && $("#end_time").val() != "" && $("#end_time").val() != "無期限") {
                            formData.append("endTime", moment($("#end_time").val()).format(format));
                        } else {
                            formData.append("endTime", "9999/01/01 00:00");
                        }
                        formData.append("description", $("#short_content").val());
                        formData.append("content", CKEDITOR.instances['content'].getData());
                        formData.append("isClearImage", self.isClearImage);
                        formData.append("typeNoti", $("input[name='type_noti']:checked").val());

                        if ($("input[name='type_noti']:checked").val() === "2") {
                            formData.append("menuId", $("#select_list_function option:selected").attr('id').replace("function", ""));
                        } else {
                            formData.append("menuId", "");
                        }

                        $("#btn_submit_add").prop("disabled", true);
                        window.loader.show();
                        $.ajax({
                            type: "POST",
                            url: "/api/v1/web/" + appId + "/notification/create",
                            data: formData,
                            contentType: false,
                            processData: false,
                            dataType: "json",
                            success: function (response) {
                                window.loader.hide();
                                switch (response.status.code) {
                                    case 2000: {
                                        window.alert.show("success", $("#success").html(), "1200");
                                        setTimeout(function () {
                                            location.reload();
                                        }, 1200)
                                        break;
                                    }
                                }
                            }
                        })
                    }
                }
            }
        },
        mounted: function () {
            var self = this;
            configOneDate('start_time');
            configOneDate('end_time');
            validateTimeOnHideDatePicker('start_time', 'end_time', self.validateTime);
            $("input[name='type_send_noti']").on('change', function () {
                if (this.value == 'send_all') {
                    self.typeSendNoti = 1;
                    $("#link_download_template_csv").addClass("hidden");
                    $("#csv_file_group").addClass("hidden");
                } else {
                    self.typeSendNoti = 2;
                    $("#link_download_template_csv").removeClass("hidden");
                    $("#csv_file_group").removeClass("hidden");
                }
            });
            $('input[type=radio][name=optradio]').on('change', function () {
                self.resetForm();
                if (this.value == "1") {
                    self.notificationType = 1;
                    $("#content_color").removeClass("hidden");
                    /*$("#choose_time").removeClass("hidden");
                    $("#choose_time_label").removeClass("hidden");*/
                    $("#title_wrapper").removeClass("col-md-12");
                    $("#title_wrapper").addClass("col-md-8");
                } else if (this.value == "0") {
                    self.notificationType = 0;
                    /*$("#choose_time").addClass("hidden");
                    $("#choose_time_label").addClass("hidden");*/
                    $("#content_color").addClass("hidden");
                    $("#title_wrapper").removeClass("col-md-8");
                    $("#title_wrapper").addClass("col-md-12");
                }
            });

            $(".remove-image-icon").click(function () {
                if (self.$refs['user_notification_image'].hasImage == false) {
                    self.isClearImage = true;
                }
            })

            $(this.$el).find(".file-input").change(function (e) {
                if (self.$refs['user_notification_image'].hasImage == true) {
                    self.isClearImage = false;
                }
            });
            $("#btn_add_notification").click(function () {
                self.resetForm();
                $("input[name='optradio']").prop("disabled", false);
            });

            $("#csv_file").on("click", function () {
                $("#upload_csv_file_input").click();
            });
            $('input[name="upload_csv_file_input"]').change(function (e) {
                var file = e.target.files[0];
                if (file != null && file.size != 0) {
                    $("#csv_file span").html(file.name);
                    self.csvFile = file;
                } else {
                    window.alert.show("error", "CSVファイルがデータなし。", "1000");
                    if (self.csvFile == null) {
                        $("#csv_file span").html('ファイルアップロード');
                    }
                    $('input[name="upload_csv_file_input"]').val("");
                    return;
                }
                // count number memberCode
                var formData = new FormData();
                formData.append("csvFile", file);
                $.ajax({
                    type: "POST",
                    url: "/api/v1/web/" + appId + "/notification/countNumberMemberCode",
                    data: formData,
                    processData: false,
                    contentType: false,
                    headers: {
                        "Content-Type": undefined
                    },
                    beforeSend: function () {
                        window.loader.show();
                    },
                    success: function (response) {
                        window.loader.hide();
                        switch (response.status.code) {
                            case 1000: {
                                $("#number_user_found_div").removeClass("hidden");
                                $("#number_user_found_div span").html(response.data);
                                if (response.data == 0) {
                                    $("#csv_file span").html('ファイルアップロード');
                                    self.csvFile = null;
                                }
                                break;
                            }
                            case 4: {
                                window.alert.show("error", "CSVファイルのフォーマットまたは会員番号は正しくない。", "2000");
                                $("#csv_file span").html('ファイルアップロード');
                                self.csvFile = null;
                                break;
                            }
                        }
                        $('input[name="upload_csv_file_input"]').val("");
                        self.validateCsvFile();
                    }
                });
            });

        }

    });

    jQuery.get("/api/v1/web/" + appId + "/menu/getFunction", function (response) {

        response.data.forEach(function (menu) {
            var isHasMenu = false;
            var html = '<option class="list-option-function" id="function' + menu.id + '" value="' + menu.function + '">' + menu.name + '</option>';
            $("#select_list_function option").each(function () {
                if (menu.function != "COLUMN" && this.value == menu.function) {
                    isHasMenu = true;
                }
            })
            if (!isHasMenu) {
                $("#select_list_function").append(html);
                $("#select_list_function option[value='WEB_VIEW']").remove();
            }
        })
    });

    CKEDITOR.replace('content', {
        language: 'ja',
        height: 200,
        removePlugins: 'elementspath'
    });
    CKEDITOR.config.toolbar = [
        ['Styles', 'Format'],
        ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print'],
        ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Image', 'Table', '-', 'Link', 'Flash', 'Smiley', 'TextColor', 'BGColor', 'Source']
    ];

    $("#cke_1_bottom").addClass("hidden");
    $(".main-block").click(function () {
        $(".list-block").toggle();
    });
    $(document).mouseup(function (e) {
        var container = $(".main-block");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".list-block").hide();
        }
    });
    $(".list-block .block-color").on('click', function () {
        $(".main-block .block-color span,.main-block .block-color label").remove();
        $(".main-block .block-color").append($(this).html());
    })


    $(document).mouseup(function (e) {
        var container = $(".detail-main-block");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".detail-list-block").hide();
        }
    });

    $(".detail-list-block .block-color").on('click', function () {
        $(".detail-main-block .block-color span,.detail-main-block .block-color label").remove();
        $(".detail-main-block .block-color").append($(this).html());
    });

    var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

//js radio type notification
    $("#open_app_function").on('click', function () {
        $("#content_noti").addClass("hidden");
        $("#list_function").removeClass("hidden");
        $("#webview_form_group").addClass("hidden");
    });

    $("#open_view_detail").on('click', function () {
        $("#list_function").addClass("hidden");
        $("#content_noti").removeClass("hidden");
        $("#webview_form_group").addClass("hidden");
    });

    $("#open_link_webview").on('click', function () {
        $("#list_function").addClass("hidden");
        $("#content_noti").addClass("hidden");
        $("#webview_form_group").removeClass("hidden");
    });

    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }

    CKEDITOR.on('instanceReady', function (evt) {
        var editor = evt.editor;
        editor.on("blur", function () {
            add_notification.validateContent();
            add_notification.validateContentLength();
        })
        editor.on("change", function () {
            add_notification.validateContent();
            add_notification.validateContentLength();
        })
    });
    AddNotification.update = function (notificationId) {
        $("input[name='optradio']").prop("disabled", true);
        jQuery.get("/api/v1/web/" + appId + "/notification/detail/" + notificationId, function (response) {
//		        	add_notification.resetForm();
            add_notification.updateForm(response.data);
        });
    }

})