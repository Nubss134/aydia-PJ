var AddSlide = {};
$(document).ready(function () {
    var appId = $("#app_id").val();
    var url = "/api/v1/web/" + appId + "/sliderImage/getList";
    var format = "YYYY/MM/DD HH:mm";

    var getLists = function (requestData, renderFunction) {
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

    var columnDefinitions = [
        {
            "data": "typeOpenUpdated",
            "class": "text-center",
            "orderable": false
        },
        {
            "data": "urlUpdated",
            "defaultContent": "",
            "orderable": false

        },
        {
            "data": "startTimeUpdated",
            "defaultContent": "Created Time",
            "orderable": false
        },
        {
            "data": "endTimeUpdated",
            "defaultContent": "Created Time",
            "orderable": false
        },
        {
            "data": "numberMemberUnique",
            "defaultContent": "0",
            "orderable": false
        },
        {
            "data": "numberNotMemberUnique",
            "defaultContent": "0",
            "orderable": false
        },
        {
            "data": null,
            "class": "text-center",
            "orderable": false
        },
    ];

    $("#content_table").DataTable({
        "language": {
            "url": "/libs/new_data_table/js/ja.json"
        },
        "lengthMenu": [
            [100, 200, 500],
            [100, 200, 500]
        ],
        rowId: 'id',
        "ordering": true,
        "serverSide": true,
        "order": [4, "asc"],
        "searching": false,
        "columns": columnDefinitions,
        "ajax": function (data, callback) {
            getLists(data, callback);
        },
        columnDefs: [
            {
                "render": function (data) {
                    switch (data) {
                        case 1:
                            return "リンク";
                        case 2:
                            return "アプリ機能";
                        case 3:
                            return "イメージのみ表示";
                    }
                },
                "targets": 0
            },
            {
                "render": function (data) {
                    return "<img style='width: 50px; height: 50px' src=" + data + " />";
                },
                "targets": 1
            },
            {
                "render": function (data) {
                    if (data.includes("9999")) {
                        return "無期限";
                    } else {
                        return data;
                    }
                },
                "targets": 3
            },
            {
                "render": function (data) {
                    var html = '';
                    if (data.activeUpdated) {
                        html = '<label class="switch"><input type="checkbox" checked="checked" name="status_param"/> <span class="slider round"></span></label>';
                    } else {
                        html = '<label class="switch"><input type="checkbox" name="status_param"/> <span class="slider round"></span></label>';
                    }
                    html += '<button style="margin: 0px 5px;" class="btn btn-primary btn-sm btn-edit" id="btn_edit_' + data.id + '" data-toggle="modal" data-target="#modal_slider_images" >詳細</button>' +
                        '<button style="margin-right: 5px;" class="btn btn-primary btn-sm btn-download-member-click" id="btn_download_member_click_' + data.id + '" >ダウンロード</button>' +
                        '<button class="btn btn-danger btn-sm btn-delete-slider" id="btn_delete_' + data.id + '" data-toggle="modal" data-target="#modal_delete_slide" >削除</button>';
                    return html;
                },
                "targets": 6
            }
        ]
    });
    var form_slider_images = new Vue({
        el: "#form_slider_images",
        data: {
            id: null,
            validImage: true,
            validStartTime: true,
            validEndTime: true,
            validTime: true,
            validHttp: true,
            isUpdate: false,
            invalidTimeMessage: "開始時間は終了時間より早くしてください。",
            invalidStartTimeMessage: "開始時間は無効です。",
            invalidEndTimeMessage: "終了時間は無効です。",
            invalidImageMessage: "写真をアップロードしてください。",
            invalidHttpMessage: "HTTP/HTTPSを含むリンクを入力してください。",
            position: 0,
        },
        methods: {
            updateForm: function (slider) {
                var self = this;
                this.id = slider.id;
                $("#start_time_slider").val(slider.startTimeUpdated);
                if (slider.endTimeUpdated.includes("9999")) {
                    $("#end_time_slider").val("無期限");
                } else {
                    $("#end_time_slider").val(slider.endTimeUpdated);
                }
                setStartDateForDatePicker("start_time_slider");
                setStartDateForDatePicker("end_time_slider");

                if (slider != null && slider != '' && slider.urlUpdated != null && slider.urlUpdated != '') {
                    $(self.$refs['slider_image'].$el).find("img").attr("src", slider.urlUpdated);
                    self.$refs['slider_image'].hasImage = true;
                    $("#slider_image .file-uploader").addClass("have_image");
                }
                $("#slider_link").val(slider.linkUpdated);
                switch (slider.typeOpenUpdated) {
                    case 1:
                        $("input[name='radio_type_slide'][value='1']").prop('checked', true);
                        if (slider.typeOpenLinkUpdated == 1) {
                            $("input[name='open_with'][value='1']").prop('checked', true);
                        } else {
                            $("input[name='open_with'][value='2']").prop('checked', true);
                        }
                        $("#type_slide_function").addClass("hidden");
                        $("#type_slide_link").removeClass("hidden");
                        break;
                    case 2:
                        $("input[name='radio_type_slide'][value='2']").prop('checked', true);
                        $('#select_function option[id="function' + slider.menuEntityUpdated.id + '"]').prop('selected', true);
                        $("#type_slide_link").addClass("hidden");
                        $("#type_slide_function").removeClass("hidden");
                        break;
                    case 3:
                        $("input[name='radio_type_slide'][value='3']").prop('checked', true);
                        $("#type_slide_link").addClass("hidden");
                        $("#type_slide_function").addClass("hidden");
                        break;
                }

            },
            resetForm: function () {
                $("#slider_link").val("");
                $(".file-input").prop('disabled', false);
                $("#start_time_slider").val(moment().format(format));
                $("#end_time_slider").val("");
                this.validImage = true;
                this.validStartTime = true;
                this.validEndTime = true;
                this.validTime = true;
                this.validHttp = true;
                this.$refs['slider_image'].hasImage = false;
                this.position = 0;
                this.id = null;
            },
            validateForm: function () {
                this.validateStartTime();
                this.validateEndTime();
                this.validateTime();
                this.validateHttp();
                this.validateImage();
                return this.validImage && this.validHttp && this.validStartTime && this.validEndTime && this.validTime;
            },
            validateStartTime: function () {
                var startTime = $("#start_time_slider").val();
                if (startTime === null || startTime === undefined || startTime.trim() === "") {
                    this.validStartTime = false;
                } else {
                    this.validStartTime = true;
                }
            },
            validateEndTime: function () {
                var endTime = $("#end_time_slider").val();
                if (endTime === null || endTime === undefined || endTime.trim() === "") {
                    this.validEndTime = true;
                } else {
                    this.validEndTime = true;
                }
            },
            validateTime: function () {
                var startTime = new Date($("#start_time_slider").val()).getTime();
                var endTimeString = $("#end_time_slider").val();
                var endTime = new Date(endTimeString).getTime();
                if (endTimeString == null || endTimeString === undefined || endTimeString.trim() === "") {
                    this.validTime = true;
                } else {
                    if (startTime >= endTime) {
                        this.validTime = false;
                    } else {
                        this.validTime = true;
                    }
                }
            },
            validateImage: function () {
                if (this.$refs['slider_image'].hasImage) {
                    this.validImage = true;
                } else {
                    this.validImage = false;
                }
            },
            validateHttp: function () {
                var typeOpen = $("input[name='radio_type_slide']:checked").val();
                if (typeOpen != '1') {
                    this.validHttp = true;
                } else {
                    var url = $("#slider_link").val();
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
            addSlider: function (e) {
                var self = this;
                e.preventDefault();
                if (this.validateForm()) {
                    var formData = new FormData();
                    var typeOpen = $("input[name='radio_type_slide']:checked").val();
                    formData.append("id", self.isUpdate ? self.id : "0");
                    formData.append("typeOpen", typeOpen);
                    formData.append("startTime", $("#start_time_slider").val());
                    var endTimeInput = $("#end_time_slider").val();
                    if (endTimeInput == null || endTimeInput === "" || endTimeInput === "無期限") {
                        formData.append("endTime", "9999/12/31 23:59");
                    }
                    formData.append("endTime", endTimeInput);
                    formData.append("link", $("#slider_link").val());
                    formData.append("typeOpenLink", $("input[name='open_with']:checked").val());
                    formData.append("menuId", $("#select_function option:selected").attr('id').replace("function", ""));
                    formData.append("imageAttachment", self.$refs['slider_image'].getSelectedFile());
                    formData.append("position", self.position);
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/sliderImage/add",
                        data: formData,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        beforeSend: function () {
                            $("#btn_submit_add").attr('disabled', true);
                            self.$refs["loader"].show();
                        },
                        success: function (response) {
                            switch (response.status.code) {
                                case 2000: {
                                    $('html,body').animate({
                                        scrollTop: 0
                                    }, 300);
                                    window.alert.show("success", "スライド画像を作成しました。", 1000);
                                    setTimeout(function () {
                                        location.reload();
                                    }, 1000);
                                    break;
                                }
                                case 2003: {
                                    self.$refs["loader"].hide();
                                    window.alert.show("error", response.data, 3000);
                                    $('#btn_submit_add').prop("disabled", false);
                                    break;
                                }
                                case 1111: {
                                    self.$refs["loader"].hide();
                                    window.alert.show("error", response.status.message, 3000);
                                    $('#btn_submit_add').prop("disabled", false);
                                    break;
                                }
                                case 1808: {
                                    self.$refs["loader"].hide();
                                    window.alert.show("error", response.status.message, 3000);
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
            var self = this;
            configStartDateSlider("start_time_slider");
            configEndDateSlider("end_time_slider");
            validateTimeOnHideDatePicker('start_time_slider', 'end_time_slider', this.validateTime);
            $(this.$el).find(".file-input").change(function (e) {
                if (self.$refs['slider_image'].hasImage == true) {
                    $("#slider-image-uploader .file-uploader").addClass("have_image");
                } else {
                    $("#slider-image-uploader .file-uploader").removeClass("have_image");
                }
                self.validateImage();
            });

            $(document).on("click", "#add_image_btn", function () {
                self.isUpdate = false;
                self.resetForm();
            })

            $("#slider-image-uploader .remove-image-icon").click(function () {
                self.$refs['slider_image'].hasImage = false;
                $("#slider-image-uploader .file-uploader").removeClass("have_image");
            });
        },
    });

    $(document).on("click", ".btn-edit", function () {
        AddSlide.update($(this).attr("id").replace("btn_edit_", ""));
        var position = $(this).parent().parent().attr('id').replace("position", "");
        form_slider_images.position = position;
    })

    $(document).on("click", ".btn-download-member-click", function () {
        var slideId = $(this).attr("id").replace("btn_download_member_click_", "");
        var href = "/api/v1/web/" + appId + "/sliderImage/downloadMemberCLickSliderCSV/" + slideId;
        window.location.href = href;
    });


    $('#model_add_slider_btn').click(function () {
        form_slider_images.isUpdate = false;
        form_slider_images.resetForm();
    })

    AddSlide.update = function (slideId) {
        form_slider_images.isUpdate = true;
        jQuery.get("/api/v1/web/" + appId + "/sliderImage/" + slideId, function (response) {
            form_slider_images.resetForm();
            form_slider_images.updateForm(response.data);
        });
    }

    $(document).on("click", ".btn-delete-slider", function () {
        var id = $(this).attr('id').replace("btn_delete_", "");
        $("#btn_submit_delete").on('click', function () {
            $.ajax({
                type: "POST",
                url: "/api/v1/web/" + appId + "/sliderImage/delete/" + id,
                success: function (response) {
                    switch (response.status.message) {
                        case "SUCCESS": {
                            $('html,body').animate({
                                scrollTop: 0
                            }, 300);
                            window.alert.show("success", "スライド画像を削除しました。", 3000);
                            setTimeout(function () {
                                location.reload();
                            }, 1000);
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
    });

    $(document).on('click', ".slider", function () {
        var sliderId = $(this).parent().parent().parent().attr('id');
        $.ajax({
            type: "GET",
            url: "/api/v1/web/" + appId + "/sliderImage/changeStatus/" + sliderId,
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
    })

    $("#save_position").on('click', function () {
        var listSlide = [];
        $('.btn-edit').each(function (e) {
            var slideId = $(this).attr('id').replace("btn_edit_", "");
            var slide = {
                id: slideId,
                position: e + 1
            }
            listSlide.push(slide);
        });
        if (listSlide.length === 0) {
            return;
        }
        $.ajax({
            type: "POST",
            data: JSON.stringify(listSlide),
            contentType: "application/json",
            url: "/api/v1/web/" + appId + "/sliderImage/updateOrder",
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
    })

    jQuery.get("/api/v1/web/" + appId + "/menu/getFunction", function (response) {
        response.data.forEach(function (menu) {
            if (menu.typeDisplay !== "NONE") {
                var isHasMenu = false;
                var html = '<option class="list-option-function" id="function' + menu.id + '" value="' + menu.function + '">' + menu.name + '</option>';
                $("#select_function option").each(function () {
                    if (menu.function !== "COLUMN" && this.value === menu.function) {
                        isHasMenu = true;
                    }
                });
                if (!isHasMenu) {
                    $("#select_function").append(html);
                    $("#select_function option[value='WEB_VIEW']").remove();
                }
            }
        })
    });

    $("#radio_slide_type_link").on('click', function () {
        $("#type_slide_function").addClass("hidden");
        $("#type_slide_link").removeClass("hidden");
        $("#type_open_link").removeClass('hidden');
    });

    $("#radio_slide_type_function").on('click', function () {
        $("#type_slide_link").addClass("hidden");
        $("#type_slide_function").removeClass("hidden");
        $("#type_open_link").addClass('hidden');
    });

    $("#radio_slide_type_none").on('click', function () {
        $("#type_slide_link").addClass("hidden");
        $("#type_slide_function").addClass("hidden");
        $("#type_open_link").addClass('hidden');
    });

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