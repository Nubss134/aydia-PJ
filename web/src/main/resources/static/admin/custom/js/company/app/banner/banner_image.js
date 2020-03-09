var banner = {};
$(document).ready(function () {
    $(".container-banner").sortable();

    var appId = $("#app_id").val();
    var format = "YYYY/MM/DD HH:mm";

    banner.eventVue = new Vue({
        el: "#modal_banner_image",
        data: {
            validImage: true,
            validHttp: true,
            validDescription: true,
            validDescriptionLength: true,
            validPoint: true,
            validPointLength: true,
            validTime: true,
            validStartTime: true,
            validNote: true,
            validNoteLength: true,
            invalidImageMessage: "写真をアップロードしてください。",
            invalidHttpMessage: "HTTP/HTTPSを含むリンクを入力してください。",
            invalidDescriptionMessage: "このフィールドは必須です",
            invalidDescriptionLengthMessage: "500 文字以内で入力してください",
            invalidPointMessage: "このフィールドは必須です",
            invalidPointLengthMessage: "20 文字以内で入力してください",
            invalidTimeMessage: "開始時間は終了時間より早くしてください。",
            invalidStartTimeMessage: "このフィールドは必須です。",
            invalidNoteMessage: "このフィールドは必須です",
            invalidNoteLengthMessage: "1000 文字以内で入力してください",
            position: 0,
            id: null,
            isUpdate: false,
        },
        methods: {
            updateForm: function (banner) {
                var self = this;
                this.id = banner.id;
                if (banner != null && banner.imageUrlUpdated != null) {
                    $(self.$refs['banner_image'].$el).find("img").attr("src", banner.imageUrlUpdated);
                    self.$refs['banner_image'].hasImage = true;
                    $("#banner_image .file-uploader").addClass("have_image");
                }

                $("#bannerId").val(banner.id);
                $("#banner_script").val(banner.scriptUpdated);
                $("#start_time").val(banner.startTimeUpdated);
                this.position = banner.positionUpdated;
                if (banner.endTimeUpdated.includes("9999")) {
                    $("#end_time").val("無期限");
                } else {
                    $("#end_time").val(banner.endTimeUpdated);
                }
                CKEDITOR.instances['banner_description'].setData(banner.descriptionUpdated);
                $("#banner_memo").val(banner.memoUpdated);
                CKEDITOR.instances['banner_note'].setData(banner.noteUpdated);
                setStartDateForDatePicker("start_time");
                setStartDateForDatePicker("end_time");

                switch (banner.typeUpdated) {
                    case 1:
                        $("input[name='radio_type_banner'][value='1']").prop('checked', true);
                        if (banner.openWithWebviewUpdated) {
                            $("input[name='open_with'][value='1']").prop('checked', true);
                        } else {
                            $("input[name='open_with'][value='2']").prop('checked', true);
                        }
                        $("#type_banner_function").addClass("hidden");
                        $("#type_banner_link, #type_open_link").removeClass("hidden");
                        $("#banner_link").val(banner.linkWebviewUpdated);
                        break;
                    case 2:
                        $("input[name='radio_type_banner'][value='2']").prop('checked', true);
                        $('#select_function option[id="function' + banner.menuEntityUpdated.id + '"]').prop('selected', true);
                        $("#type_banner_link, #type_open_link").addClass("hidden");
                        $("#type_banner_function").removeClass("hidden");
                        break;
                    case 3:
                        $("input[name='radio_type_banner'][value='3']").prop('checked', true);
                        $("#type_banner_link, #type_open_link, #type_banner_function").addClass("hidden");
                        break;
                    case 4:
                        $("input[name='radio_type_banner'][value='4']").prop('checked', true);
                        $("#type_banner_link, #type_banner_function").addClass("hidden");
                        $("#type_banner_apply, #type_open_link").removeClass("hidden");
                        if (banner.openWithWebviewUpdated) {
                            $("input[name='open_with'][value='1']").prop('checked', true);
                        } else {
                            $("input[name='open_with'][value='2']").prop('checked', true);
                        }
                        $("#number_point").val(banner.pointUpdated);
                        if (banner != null && banner.imageApplyUrlUpdated != null) {
                            $(self.$refs['banner_image_apply'].$el).find("img").attr("src", banner.imageApplyUrlUpdated);
                            self.$refs['banner_image_apply'].hasImage = true;
                        } else {
                            $(self.$refs['banner_image_apply'].$el).find("img").attr("src", "");
                            this.$refs['banner_image_apply'].hasImage = false;
                        }
                        break;
                }

            },
            validateForm: function () {
                this.validateHttp();
                this.validateImage();
                this.validateDescription();
                this.validateDescriptionLength();
                this.validateNote();
                this.validateNoteLength();
                this.validateStartTime();
                this.validateTime();
                return this.validImage && this.validHttp && this.validDescription
                    && this.validDescriptionLength
                    && this.validStartTime && this.validTime && this.validNote && this.validNoteLength;
            },
            validateImage: function () {
                if (this.$refs['banner_image'].hasImage) {
                    this.validImage = true;
                } else {
                    this.validImage = false;
                }
            },
            validateHttp: function () {
                var typeOpen = $("input[name='radio_type_banner']:checked").val();
                if (typeOpen != '1') {
                    this.validHttp = true;
                } else {
                    var url = $("#banner_link").val();
                    if (url != undefined || url != '') {
                        var regExp = /((http|https):\/\/)([^#\&\?]*).*/;
                        var matched = url.match(regExp);
                        if (matched) {
                            this.validHttp = true;
                        } else {
                            this.validHttp = false;
                        }
                    } else {
                        this.validHttp = false;
                    }
                }
            },
            validateDescription: function () {
                var typeOpen = $("input[name='radio_type_banner']:checked").val();
                if (typeOpen != '4') {
                    this.validDescription = true;
                } else {
                    var description = CKEDITOR.instances["banner_description"].getData();
                    if (description === null || description === undefined || description.trim() === "") {
                        this.validDescription = false;
                    } else {
                        this.validDescription = true;
                    }
                }
            },
            validateDescriptionLength: function () {
                var typeOpen = $("input[name='radio_type_banner']:checked").val();
                if (typeOpen != '4') {
                    this.validDescriptionLength = true;
                } else {
                    var description = CKEDITOR.instances["banner_description"].getData();
                    if (description.length >= 500) {
                        this.validDescriptionLength = false;
                    } else {
                        this.validDescriptionLength = true;
                    }
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
            validateStartTime: function () {
                var startTime = $("#start_time").val();
                if (startTime === null || startTime === undefined || startTime.trim() === "") {
                    this.validStartTime = false;
                } else {
                    this.validStartTime = true;
                }
            },
            validateNote: function () {
                var typeOpen = $("input[name='radio_type_banner']:checked").val();
                if (typeOpen != '4') {
                    this.validNote = true;
                } else {
                    var note = CKEDITOR.instances["banner_note"].getData();
                    if (note === null || note === undefined || note.trim() === "") {
                        this.validNote = false;
                    } else {
                        this.validNote = true;
                    }
                }
            },
            validateNoteLength: function () {
                var typeOpen = $("input[name='radio_type_banner']:checked").val();
                if (typeOpen != '4') {
                    this.validNoteLength = true;
                } else {
                    var note = $("#banner_note").val();
                    if (note.length >= 1000) {
                        this.validNoteLength = false;
                    } else {
                        this.validNoteLength = true;
                    }
                }
            },
            resetForm: function () {
                $("#banner_link").val("");
                $("#bannerId").val("");
                CKEDITOR.instances["banner_description"].setData("");
                $("#banner_memo").val("");
                CKEDITOR.instances["banner_note"].setData("");
                $("#number_point").val("");
                $("#start_time").val(moment().format(format));
                $("#end_time").val(" ");
                $("#banner_script").val("");
                $(this.$refs['banner_image'].$el).find("img").attr("src", "");
                this.$refs['banner_image'].hasImage = false;

                $(this.$refs['banner_image_apply'].$el).find("img").attr("src", "");
                this.$refs['banner_image_apply'].hasImage = false;

                $("input[name='radio_type_banner'][value='1']").prop('checked', true);

                $('.remove-image-icon').css("pointer-events", "unset");
                $('.radio-container, .btn-submit-add').css("cursor", "pointer");
                $('input, textarea').css("cursor", "unset");
                $('.btn-submit-add, input,textarea, select').prop("disabled", false);
                this.validImage = true;
                this.validHttp = true;
                this.validDescription = true;
                this.validDescriptionLength = true;
                this.validNote = true;
                this.validNoteLength = true;
                this.position = 0;
                this.id = null;
                this.validTime = true;
                this.validStartTime = true;
                $("#type_banner_apply, type_open_link").removeClass("hidden");
                $("#type_banner_link, #type_banner_function").addClass("hidden");
            },
            updateBanner: function (e) {
                var self = this;
                e.preventDefault();
                if (this.validateForm()) {
                    var formData = new FormData();
                    var openWithWebview = ($("input[name='open_with']:checked").val() == 1) ? true : false;
                    var typeOpen = $("input[name='radio_type_banner']:checked").val();
                    formData.append("id", self.isUpdate ? self.id : "0");
                    formData.append("typeOpen", typeOpen);
                    if (typeOpen == 1) { // type open = web link
                        formData.append("link", $("#banner_link").val());
                        formData.append("openWithWebview", openWithWebview);
                    }
                    if (typeOpen == 2) { // type open = function
                        formData.append("functionId", $("#select_function option:selected").attr('id').replace("function", ""));
                    }
                    if (typeOpen == 4) {
                        formData.append("description", CKEDITOR.instances["banner_description"].getData());
                        formData.append("memo", $("#banner_memo").val());
                        formData.append("imageApplyAttachment", self.$refs['banner_image_apply'].getSelectedFile());
                        formData.append("point", $("#number_point").val());
                        formData.append("openWithWebview", openWithWebview);
                    }
                    formData.append("imageAttachment", self.$refs['banner_image'].getSelectedFile());
                    formData.append("position", self.position);
                    formData.append("startTime", $("#start_time").val());
                    if ($("#end_time").val != null && $("#end_time").val() != " " && $("#end_time").val() != "" && $("#end_time").val() != "無期限") {
                        formData.append("endTime", moment($("#end_time").val()).format(format));
                    } else {
                        formData.append("endTime", "9999/01/01 00:00");
                    }
                    formData.append("note", CKEDITOR.instances["banner_note"].getData());
                    formData.append("script", $("#banner_script").val());
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/bannerImage/save",
                        data: formData,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        beforeSend: function () {
                            self.$refs['loader'].show();
                            window.loader.show()
                        },
                        success: function (response) {
                            switch (response.status.message) {
                                case "SUCCESS": {
                                    $('html,body').animate({
                                        scrollTop: 0
                                    }, 300);
                                    window.alert.show("success", "応募バナーを作成しました。", 1000);
                                    setTimeout(function () {
                                        location.reload();
                                    }, 1000);
                                    break;
                                }
                                case "ERROR": {
                                    self.$refs["loader"].hide();
                                    window.alert.show("error", response.data, 3000);
                                    $('#btn_submit_add').prop("disabled", false);
                                    break;
                                }
                            }
                        }
                    })
                }
            }
        },
        mounted: function () {
            configOneDate('start_time');
            configOneDate('end_time');
            initCKEditor('banner_description');
            initCKEditor('banner_note');
            validateTimeOnHideDatePicker('start_time', 'end_time', this.validateTime);

            var self = this;
            $(this.$el).find(".file-input").change(function (e) {
                if (self.$refs['banner_image'].hasImage == true) {
                    $("#banner-image-uploader .file-uploader").addClass("have_image");
                } else {
                    $("#banner-image-uploader .file-uploader").removeClass("have_image");
                }
                self.validateImage();
            });
            $("#banner-image-uploader .remove-image-icon").click(function () {
                self.$refs['banner_image'].hasImage = false;
                $("#banner-image-uploader .file-uploader").removeClass("have_image");
            });
        },
    });

    $('#model_add_banner_btn').click(function () {
        banner.eventVue.resetForm();
    })


    jQuery.get("/api/v1/web/" + appId + "/menu/getFunction", function (response) {
        response.data.forEach(function (menu) {
            var isHasMenu = false;
            var isHasMenuDetail = false;
            var html = '<option class="list-option-function" id="function' + menu.id + '" value="' + menu.function + '">' + menu.name + '</option>';
            $("#select_function option").each(function () {
                if (menu.function != "COLUMN" && this.value == menu.function) {
                    isHasMenu = true;
                }
            })
            if (!isHasMenu) {
                $("#select_function").append(html);
                $("#select_function option[value='WEB_VIEW']").remove();
            }
            $("#update_select_function option").each(function () {
                if (menu.function != "COLUMN" && this.value == menu.function) {
                    isHasMenuDetail = true;
                }
            })
            if (!isHasMenuDetail) {
                $("#update_select_function").append(html);
                $("#update_select_function option[value='WEB_VIEW']").remove();
            }

        })
    });

    $(document).on("change", ".btn-deactive input", function () {
        var id = $(this).parent().attr('id').replace("btn_deactive_", "");
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/bannerImage/active/" + id,
            success: function (response) {
                switch (response.status.message) {
                    case "SUCCESS": {
                        $('html,body').animate({
                            scrollTop: 0
                        }, 300);
                        window.alert.show("success", "無効にしました。", 3000);
                        break;
                    }
                    case "ERROR": {
                        window.alert.show("error", response.data, 3000);
                        break;
                    }
                }
            }
        })
    });

    $("#save_order").on('click', function () {
        var listBanner = [];
        $(".banner-sortable").each(function (e) {
            var bannerId = $(this).attr('id').replace("banner-", "");
            var banner = {
                id: bannerId,
                position: e + 1
            }
            listBanner.push(banner);
        })
        $.ajax({
            type: "POST",
            data: JSON.stringify(listBanner),
            contentType: "application/json",
            url: "/api/v1/web/" + appId + "/bannerImage/updateOrder",
            error: function (xhr, ajaxOptions, thrownError) {
            },
            success: function (response) {
                if (response.status.code == 1000) {
                    window.alert.show("success", "成功", 2000);
                } else {
                    window.alert.show("error", "失敗", 2000);
                }
            }
        })
    })

    $(document).on('click', ".slider", function () {
        var bannerId = $(this).parent().parent().parent().attr('id');
        $.ajax({
            type: "GET",
            url: "/api/v1/web/" + appId + "/bannerImage/changeStatusBanner/" + bannerId,
            error: function (xhr, ajaxOptions, thrownError) {

            },
            success: function (response) {
                if (response.status.code === 1000) {
                    window.alert.show("success", "変更しました。", "1000");
                } else {
                    window.alert.show("success", "エーラ！！", "1000");
                }
            }

        })
    });

    $("#save_position").on('click', function () {
        var listBanner = [];
        $('.btn-update-banner').each(function (e) {
            var bannerId = $(this).attr('id').replace("btn_update_", "");
            var banner = {
                id: bannerId,
                position: e + 1
            };
            listBanner.push(banner);
        });
        if (listBanner.length === 0) {
            return;
        }
        $.ajax({
            type: "POST",
            data: JSON.stringify(listBanner),
            contentType: "application/json",
            url: "/api/v1/web/" + appId + "/bannerImage/updateOrder",
            error: function (xhr, ajaxOptions, thrownError) {
            },
            success: function (response) {
                if (response.status.code === 1000) {
                    window.alert.show("success", "成功", 2000);
                } else {
                    window.alert.show("error", "失敗", 2000);
                }
            }

        })
    });

    $("#radio_banner_type_link").on('click', function () {
        $("#type_banner_function, #type_banner_apply").addClass("hidden");
        $("#type_banner_link, #type_open_link").removeClass("hidden");
    });

    $("#radio_banner_type_function").on('click', function () {
        $("#type_banner_link, #type_open_link, #type_banner_apply").addClass("hidden");
        $("#type_banner_function").removeClass("hidden");
    });

    $("#radio_banner_type_none").on('click', function () {
        $("#type_banner_link, #type_open_link, #type_banner_function, #type_banner_apply").addClass("hidden");
    });

    $("#radio_banner_type_apply").on('click', function () {
        $("#type_banner_link, #type_banner_function").addClass("hidden");
        $("#type_banner_apply, #type_open_link").removeClass("hidden");
    });

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

    var fixHelperModified = function (e, tr) {
        var $originals = tr.children();
        var $helper = tr.clone();
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

})