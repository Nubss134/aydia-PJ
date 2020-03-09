//1 open inapp, 2 redirect to function, 3 webview
//type Push User: 1:all 2: list
var AddPushNotification = {};

$(document).ready(function () {
    var appId = $("#app_id").val();
    var format = "YYYY/MM/DD HH:mm";
    AddPushNotification.pushNotifiationVue = new Vue({
        el: "#modal_add_push_notification",
        data: {
            validTitle: true,
            validTimePush: true,
            validSubTitle: true,
            validContent: true,
            validWebLink: true,
            validTitleLength: true,
            validSubTitleLength: true,
            validContentLength: true,
            validWebLinkLength: true,
            validCsvFile: true,
            invalidMessage: "このフィールドは必須です。",
            invalidTitleLengthMessage: "100 文字以内で入力してください。",
            invalidSubTitleLengthMessage: "500 文字以内で入力してください。",
            invalidContentLengthMessage: "500 文字以内で入力してください。",
            invalidWebLinkLengthMessage: "1000 文字以内で入力してください。",
            typePush: 1,
            pushNow: true,
            typePushUser: 1,//push all
            isClearImage: false,
            csvFile: null,
            csvFileName: null,
            id: null,
            toNumberUser: 0,
            numberUserFound: 0,
        },
        methods: {
            resetForm: function () {
                //reset Data Vue
                this.validTitle = true;
                this.validTimePush = true;
                this.validSubTitle = true;
                this.validContent = true;
                this.validWebLink = true;
                this.validTitleLength = true;
                this.validSubTitleLength = true;
                this.validContentLength = true;
                this.validWebLinkLength = true;
                this.validCsvFile = true;
                this.typePush = 1;
                this.typePushUser = 1;
                this.pushNow = true;
                this.isClearImage = false;
                this.id = null;
                this.csvFile = null;
                this.csvFileName = null;
                this.numberUserFound = 0;
                // set data
                $("#title_input").val("");
                $("#short_description_input").val("");
                CKEDITOR.instances["long_description_input"].setData("");
                $("#link_webview_input").val("");
                $(this.$refs['push_notification_image'].$el).find("img").attr("src", "");
                this.$refs['push_notification_image'].hasImage = false;
                $("#push_csv_file span").html('ファイルアップロード');
                //reset dom
                $("#in_app").prop("checked", true);
                $("#push_now").prop("checked", true);
                $("#push_all").prop("checked", true);
                $("#webview_form_group").addClass("hidden");
                $("#link_function_form").addClass("hidden");
                $("#image_form_group").removeClass("hidden");
                $("#long_description_form_group").removeClass("hidden");
                $("#to_number_user_group").addClass("hidden");
                $("#link_download_template_csv").addClass("hidden");
                $("#push_csv_file_group").addClass("hidden");
                $("#number_user_found_div").addClass("hidden");

                //remove disabled
                $("input[name='action_type_radio']").prop("disabled", false);
                $("#image_form_group").prop("disabled", false);
                $("#title_input").prop("disabled", false);
                $("#short_description_input").prop("disabled", false);
                $("#link_webview_input").prop("disabled", false);
                $("#list_function").prop("disabled", false);
                $("input[name='type_push']").prop("disabled", false);
                CKEDITOR.instances['long_description_input'].setReadOnly(false);
                $("input[name='filter_push']").prop("disabled", false);
                $("#upload_csv_file_input").prop("disabled", false);
                $("#push_notification_btn").prop("disabled", false);

            },
            updateForm: function (pushNotification) {
                this.id = pushNotification.id;
                this.typePushUser = pushNotification.typePushUser;
                this.csvFileName = pushNotification.fileNamePushToListUser;
                this.toNumberUser = pushNotification.toNumberUser;
                if (pushNotification.statusPush === "SUCCESS") {
                    this.pushNow = true;
                    disabledAllElement();
                } else {
                    this.pushNow = false;
                    enabledAllElement();
                }
                if (pushNotification.imageUrl != null && pushNotification.imageUrl !== '') {
                    $(this.$refs['push_notification_image'].$el).find("img").attr("src", pushNotification.imageUrl);
                    this.$refs['push_notification_image'].hasImage = true;
                }
                $("#title_input").val(pushNotification.title);
                $("#short_description_input").val(pushNotification.shortDescription);
                $("#time_push").val(moment(pushNotification.pushTime).format(format));
                $("#list_function").val(pushNotification.menuEntity.function);
                $("#to_number_user").html(pushNotification.toNumberUser);
                if (pushNotification.typePush == 2) {
                    displayCheckBoxWebview(pushNotification, this);
                } else if (pushNotification.typePush == 1) {

                    CKEDITOR.instances["long_description_input"].setData(pushNotification.longDescription);

                    // displayCheckBoxInApp(pushNotification, this);
                } else {
                    displayCheckBoxLinkFunction(pushNotification, this);
                }
                if (pushNotification.typePushUser === 1) {
                    $("#push_all").prop("checked", true);
                    $("#link_download_template_csv").addClass("hidden");
                    $("#push_csv_file_group").addClass("hidden");
                } else {
                    $("#push_by_file").prop("checked", true);
                    $("#link_download_template_csv").removeClass("hidden");
                    $("#push_csv_file_group").removeClass("hidden");
                    $("#push_csv_file span").html(pushNotification.fileNamePushToListUser);
                }
                $("#to_number_user_group").removeClass("hidden");
            },
            validateTitle: function () {
                if (($("#title_input").val()).length != 0) {
                    this.validTitle = true;
                    if ($("#title_input").val().length > 100) {
                        this.validTitleLength = false;
                    } else {
                        this.validTitleLength = true;
                    }
                } else {
                    this.validTitle = false;
                }
            },
            validateSubTitle: function () {
                if (($("#short_description_input").val()).length != 0) {
                    this.validSubTitle = true;
                    if ($("#short_description_input").val().length > 500) {
                        this.validSubTitleLength = false;
                    } else {
                        this.validSubTitleLength = true;
                    }
                } else {
                    this.validSubTitle = false;
                }
            },
            validateContent: function () {
                if (this.typePush == 1) {
                    var value = CKEDITOR.instances["long_description_input"].getData();
                    if (value.length !== 0) {
                        this.validContent = true;
                        if (value.length > 1000) {
                            this.validContentLength = false;
                        } else {
                            this.validContentLength = true;
                        }
                    } else {
                        this.validContent = false;
                    }
                } else {
                    this.validContent = true;
                    this.validContentLength = true;
                }

            },
            validateWebLink: function () {
                if (this.typePush == 2) {
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
            validateTimePush: function () {
                if (this.pushNow) {
                    this.validTimePush = true;
                } else {
                    var value = $("#time_push").val();
                    if (value.length != 0) {
                        this.validTimePush = true;
                    } else {
                        this.validTimePush = false;
                    }
                }
            },
            validateCsvFile: function () {
                if (this.typePushUser == 1) {
                    this.validCsvFile = true;
                } else {
                    if (this.csvFile != null || this.csvFileName != null) {
                        this.validCsvFile = true;
                    } else {
                        this.validCsvFile = false;
                    }
                }
            },
            validateForm: function () {
                this.validateTitle();
                this.validateSubTitle();
                this.validateContent();
                this.validateWebLink();
                this.validateTimePush();
                this.validateCsvFile();
                return this.validTitle && this.validTitleLength && this.validSubTitle && this.validSubTitleLength
                    && this.validContent && this.validContentLength && this.validWebLink && this.validWebLinkLength
                    && this.validTimePush && this.validCsvFile;
            },
            addPushNotification: function () {
                if (this.validateForm()) {
                    var pushNotification = {
                        id: this.id,
                        typePush: this.typePush,
                        typePushUser: this.typePushUser,
                        pushNow: this.pushNow,
                        title: $("#title_input").val(),
                        statusPush: "PENDING",
                        shortDescription: $("#short_description_input").val(),
                        longDescription: CKEDITOR.instances["long_description_input"].getData(),
                        linkWebview: $("#link_webview_input").val(),
                        createdTime: moment(new Date()).format(format),
                        pushTime: moment($("#time_push").val()).format(format),
                        menuEntity: {id: $("#list_function option:selected").attr('id')},
                        toNumberUser: this.toNumberUser,
                        fileNamePushToListUser: this.csvFileName,
                    }
                    var formData = new FormData();
                    formData.append("image", this.$refs['push_notification_image'].getSelectedFile());
                    formData.append("csvFile", this.csvFile);
                    formData.append("isClearImage", new Blob([this.isClearImage], {
                        type: "application/json"
                    }));
                    formData.append("pushNotification", new Blob([JSON.stringify(pushNotification)], {
                        type: "application/json"
                    }));
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/pushNotification/addAndPush",
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
                            $("#push_notification_btn").prop("disabled", false);
                            window.loader.hide();
                            if (response.status.code === 4) {
                                window.alert.show("error", "プッシュ通知できません。 ", 1200);
                            } else {
                                window.alert.show("success", "プッシュ通知しました。 ", 1200);
                                setTimeout(function () {
                                    location.reload();
                                }, 1000)
                            }


                        }
                    });
                }
            }
        },
        mounted: function () {
            initCKEditor('long_description_input');
            var self = this;
            configOneDate('time_push')
            $("#add_push_notification").on('click', function () {
                self.resetForm();
            });
            $(".btn-view").on('click', function () {
                self.resetForm();
            });
            $("input[name='action_type_radio']").on('change', function () {
                if (this.value == 'in_app') {
                    displayCheckBoxInApp(null, self);
                } else if (this.value == 'web_view') {
                    displayCheckBoxWebview(null, self);
                } else {
                    displayCheckBoxLinkFunction(null, self);
                }
            });
            $("input[name='type_push']").on('change', function () {
                if (this.value == 'push_now') {
                    self.pushNow = true;
                    $("#time_push_group").addClass("hidden");
                } else {
                    self.pushNow = false;
                    $("#time_push_group").removeClass("hidden");
                }
            });
            $("input[name='filter_push']").on('change', function () {
                if (this.value == 'push_all') {
                    self.typePushUser = 1;
                    $("#link_download_template_csv").addClass("hidden");
                    $("#push_csv_file_group").addClass("hidden");
                } else {
                    self.typePushUser = 2;
                    $("#link_download_template_csv").removeClass("hidden");
                    $("#push_csv_file_group").removeClass("hidden");
                }
            });
            $(".remove-image-icon").click(function () {
                if (self.$refs['push_notification_image'].hasImage == false) {
                    self.isClearImage = true;
                }
            })

            $(this.$el).find(".file-input").change(function () {
                if (self.$refs['push_notification_image'].hasImage == true) {
                    self.isClearImage = false;
                }
            });
            jQuery.get("/api/v1/web/" + appId + "/menu/getFunction", function (response) {
                response.data.forEach(function (menu) {
                    var isHasMenu = false;
                    var isHasMenuDetail = false;
                    var html = '<option class="list-option-function" id="' + menu.id + '" value="' + menu.function + '" name="' + menu.name + '">' + menu.name + '</option>';
                    $("#list_function option").each(function () {
                        if (menu.function != "COLUMN" && this.value == menu.function) {
                            isHasMenu = true;
                        }
                    })
                    if (!isHasMenu) {
                        $("#list_function").append(html);
                        $("#list_function option[value='WEB_VIEW']").remove();
                    }
                    $("#list_function_detail option").each(function () {
                        if (menu.function != "COLUMN" && this.value == menu.function) {
                            isHasMenuDetail = true;
                        }
                    })
                    if (!isHasMenuDetail) {
                        $("#list_function_detail").append(html);
                        $("#list_function_detail option[value='WEB_VIEW']").remove();
                    }

                })
            });

            $("#check_all").click(function () {
                $('.check').attr('checked', this.checked);
            });

            $("#reload_push_notification").click(function () {
                var list = [];
                $.each($("input[name='reload_data']:checked"), function () {
                    list.push($(this).val().split("/")[0]);
                });
                if (list.length == 0) {
                    window.alert.show("error", "プッシュ通知を選択してください。", 1200);
                } else {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: "/api/v1/web/" + appId
                            + "/pushNotification/reloadData?list=" + list,
                        data: "",
                        error: function (xhr, ajaxOptions,
                                         thrownError) {
                        },
                        success: function (response) {
                            if (response.status.code === 1000) {
                                window.alert.show("success",
                                    "成功", 1200);
                                setTimeout(function () {
                                    location.reload();
                                }, 1200)
                            } else {
                                window.alert.show("error",
                                    "エラーが発生しましたー。", 1200);
                            }
                        }
                    })
                }
            })

            $("#push_csv_file").on("click", function () {
                $("#upload_csv_file_input").click();
            });
            $('input[name="upload_csv_file_input"]').change(function (e) {
                var file = e.target.files[0];
                if (file != null && file.size != 0) {
                    $("#push_csv_file span").html(file.name);
                    self.csvFile = file;
                } else {
                    window.alert.show("error", "CSVファイルがデータなし。", "1000");
                    if (self.csvFile == null) {
                        $("#push_csv_file span").html('ファイルアップロード');
                    }
                    $('input[name="upload_csv_file_input"]').val("");
                    return;
                }
                // count number memberCode
                var formData = new FormData();
                formData.append("csvFile", file);
                $.ajax({
                    type: "POST",
                    url: "/api/v1/web/" + appId + "/pushNotification/countNumberMemberCode",
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
                                    $("#push_csv_file span").html('ファイルアップロード');
                                    self.csvFile = null;
                                }
                                break;
                            }
                            case 4: {
                                window.alert.show("error", "CSVファイルのフォーマットは正しくない。", "2000");
                                $("#push_csv_file span").html('ファイルアップロード');
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
    })

    function initCKEditor(element) {
        CKEDITOR.replace(element, {
            language: 'ja',
            height: 200,
            removePlugins: 'elementspath'
        })
        CKEDITOR.config.toolbar = [
            ['Styles', 'Format'],
            ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print'],
            ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Image', 'Table', '-', 'Link', 'Flash', 'Smiley', 'TextColor', 'BGColor', 'Source']
        ];
    }

    function enabledAllElement() {
        $("input[name='action_type_radio']").prop("disabled", false);
        $("#image_form_group").prop("disabled", false);
        $("#push_later").prop("checked", true);
        $("#time_push_group").removeClass("hidden");
        $("#title_input").prop("disabled", false);
        $("#short_description_input").prop("disabled", false);
        $("#link_webview_input").prop("disabled", false);
        $("#list_function").prop("disabled", false);
        $("input[name='type_push']").prop("disabled", false);
        $("input[name='false']").prop("disabled", true);
        CKEDITOR.instances['long_description_input'].setReadOnly(false);
        $("#upload_csv_file_input").prop("disabled", false);
        $("#push_notification_btn").prop("disabled", false);

    }

    function disabledAllElement() {
        $("input[name='action_type_radio']").prop("disabled", true);
        $("#image_form_group").prop("disabled", true);
        $("#push_now").prop("checked", true);
        $("#time_push_group").addClass("hidden");
        $("#title_input").prop("disabled", true);
        $("#short_description_input").prop("disabled", true);
        $("#link_webview_input").prop("disabled", true);
        $("#list_function").prop("disabled", true);
        $("input[name='type_push']").prop("disabled", true);
        $("input[name='filter_push']").prop("disabled", true);
        CKEDITOR.instances['long_description_input'].setReadOnly(true);
        $("#upload_csv_file_input").prop("disabled", true);
        $("#push_notification_btn").prop("disabled", true);
    }

    function displayCheckBoxInApp(pushNotification, object) {
        object.typePush = 1
        $("#in_app").prop("checked", true);
        $("#long_description_form_group").removeClass("hidden");
        if (pushNotification != null) {
            CKEDITOR.instances["long_description_input"].setData(pushNotification.longDescription);

        }
        $("#webview_form_group").addClass("hidden");
        $("#link_function_form").addClass("hidden");
    }

    function displayCheckBoxWebview(pushNotification, object) {
        object.typePush = 2;
        $("#web_view").prop("checked", true);
        $("#long_description_form_group").addClass("hidden");
        $("#webview_form_group").removeClass("hidden");
        if (pushNotification != null) {
            $("#link_webview_input").val(pushNotification.linkWebview);
        }
        $("#link_function_form").addClass("hidden");
    }

    function displayCheckBoxLinkFunction(pushNotification, object) {
        object.typePush = 3;
        $("#link_function").prop("checked", true);
        $("#long_description_form_group").addClass("hidden");
        $("#webview_form_group").addClass("hidden");
        $("#link_function_form").removeClass("hidden");
        if (pushNotification != null) {
            $('#list_function_detail option[id="function' + pushNotification.menuEntity.id + '"]').prop('selected', true);
        }
    }
});