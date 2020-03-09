SystemNoti = {};
var sizeSystemNotification = 10;
var keyword = "";
var files = [];
var updateRemoveFileIds = [];
var updateNewFiles = [];
$(document).ready(function () {

    var format = "YYYY/MM/DD HH:mm";

    SystemNoti.renderSystemNotification = function (size, keyword) {
        var total;
        jQuery.get("/api/v1/web/system/notification/list?page=1" + "&size=" + size + "&keyword=" + keyword, function (response) {
            var total;
            if (response.data.totalElements % size == 0) {
                total = Math.floor(response.data.totalElements / size);
            } else {
                total = Math.floor(response.data.totalElements / size) + 1;
            }
            var visible;
            if (total < 10) {
                visible = total;
            } else {
                visible = 10;
            }
            $('#pagination').twbsPagination({
                totalPages: total == 0 ? 1 : total,
                visiblePages: visible,
                onPageClick: function (event, page) {
                    getListSystemNoti(page, sizeSystemNotification, keyword);
                }
            }).on('page', function (event, page) {
            });
        })

    }

    SystemNoti.renderSystemNotification(sizeSystemNotification, keyword);

    function getListSystemNoti(page, size, keyword) {
        $("#list_system_noti_wrapper .list_system_noti_item").remove();
        jQuery.get("/api/v1/web/system/notification/list?page=" + page + "&size=" + size + "&keyword=" + keyword, function (response) {
            if (response.data.content.length != 0) {
                systemNotis = response.data.content;
                for (var i = 0; i < systemNotis.length; i++) {
                    var systemNoti = systemNotis[i];
                    var html = SystemNoti.createSystemNoti(systemNoti);
                    $("#list_system_noti_wrapper").append(html);
                }
                SystemNoti.changeStatus();
                SystemNoti.updateSystemNoti();
                SystemNoti.deleteSystemNoti();
            }
        });

    }

    $("#select_number_system_noti").change(function () {
        var size = $(this).val();
        var keyword = $("#input_search").val();
        var total;
        jQuery.get("/api/v1/web/system/notification/list?page=1" + "&size=" + size + "&keyword=" + keyword, function (response) {

            var total;
            if (response.data.totalElements % size == 0) {
                total = Math.floor(response.data.totalElements / size);
            } else {
                total = Math.floor(response.data.totalElements / size) + 1;
            }
            var visible;
            if (total < 10) {
                visible = total;
            } else {
                visible = 10;
            }
            $("#list_system_noti_wrapper .list_system_noti_item").remove();
            if (response.data.content.length != 0) {
                systemNotis = response.data.content;
                for (var i = 0; i < systemNotis.length; i++) {
                    var systemNoti = systemNotis[i];
                    var html = SystemNoti.createSystemNoti(systemNoti);
                    $("#list_system_noti_wrapper").append(html);
                }
                SystemNoti.changeStatus();
                SystemNoti.updateSystemNoti();
                SystemNoti.deleteSystemNoti();

            }
            $('#pagination').twbsPagination('destroy');
            $('#pagination').twbsPagination({
                totalPages: total == 0 ? 1 : total,
                visiblePages: visible,
                onPageClick: function (event, page) {
                    getListSystemNoti(page, size, keyword);
                }
            }).on('page', function (event, page) {
            });
        })

    });

    SystemNoti.createSystemNoti = function (systemNoti) {
        var endTime;
        if (systemNoti.endTime.includes("9999")) {
            endTime = "無期限"
        } else {
            endTime = moment(systemNoti.endTime).format(format);
        }
        var listFileEntity = [];
        if (systemNoti.fileUploadSystemNotificationEntity != null) {
            if (systemNoti.fileUploadSystemNotificationEntity.length != 0) {
                systemNoti.fileUploadSystemNotificationEntity.forEach(function (e) {
                    if (e.deleted == false) {
                        var label = "<label class='selected-file'>" +
                            "  <i class='fa fa-paperclip' style='margin-right: 10px'></i>" +
                            "  <a href='/downloadSystemNotificationFile?id=" + e.fileUploadEntity.id + "' id='" + e.fileUploadEntity.id + "' target='_blank'>" + e.fileUploadEntity.fileName + "</a>" +
                            "</label>"
                        listFileEntity.push(label)
                    }
                })
            }
        }


//        var endDate = systemNoti.endTime.replace("/", "").replace("/", "").replace(" ", "").replace(":", "");
//        var currentTime = new Date();
        var expiredLabel = "";
        if (systemNoti.statusExpired === 2) {
            expiredLabel = "<span style='margin-left: 15px; padding: 7px;' class='badge badge-dark'>有効期限切れ</span>"
        }

        var colorImportant = "";
        var labelImportant = "";
        if (systemNoti.type == 1) {
            colorImportant = systemNoti.color;
            labelImportant = "<span style='margin-left: 15px; padding: 7px; width: 50px;' class='badge badge-danger'>重要</span>"
        }

        return "<div class='list_system_noti_item' style='border-color: " + colorImportant + "' id='systemNoti_" + systemNoti.id + "'>" +
            "       <div class='info_wrapper' style='padding: 10px;'>" +
            "           <div data-toggle='collapse' data-target='#content_" + systemNoti.id + "' style='border-bottom: solid 1px #cecece; margin-bottom: 10px; padding-bottom: 5px;cursor: pointer'>" +
            "               <span class='systemNoti-title'>" + systemNoti.title + "</span>" + expiredLabel + labelImportant +
            "               <div class='pull-right'>" +
            "                   <label class='switch-systemNoti switch' id='systemNoti_" + systemNoti.id + "'>" +
            "                               <input type='checkbox'" + (systemNoti.status === 1 ? "checked='checked'" : "") + "/>" +
            "                           <span class='slider round'></span>" +
            "                       </label>" +
            "                        <span class='btn btn-primary btn-sm btn-update-systemNoti' role='button' data-toggle='modal'" +
            "                           data-target='#modal_notification' id='btn_update_" + systemNoti.id + "'>" +
            "                            <i class='fa fa-pencil-square-o'></i>" +
            "                       </span>" +
            "                       <span class='btn btn-sm btn-danger btn-delete-systemNoti' role='button' id='btn_deleted_" + systemNoti.id + "'" +
            "                           data-toggle='modal' data-target='#delete_system_noti_modal'>" +
            "                           <i class='fa fa-trash-o'></i>" +
            "                        </span>" +
            "                </div>" +
            "           </div>" +
            "		<div id='content_" + systemNoti.id + "'>" +
            "           <div class='systemNoti-content' data-toggle='tooltip' data-placement='top' title='" + systemNoti.content + "'>" + systemNoti.content + "</div>" +
            "               <div style='display: flex'>" +
            "                   <div style='flex: 7'>" + replaceAll(listFileEntity.toString(), ',', '') + "</div>" +
            "                    <div style='flex:2;position: relative'>" +
            "                       <div style='color: #3B4351; font-style: italic;position: absolute; bottom: 0px; right: 0px;'>" +
            "                           <div class='notification-time systemNoti-start-time'>開始時間: " + moment(systemNoti.startTime).format(format) + "</div>" +
            "                           <div class='notification-time systemNoti-end-time'>終了時間: " + endTime + "</div>" +
            "                       </div>" +
            "                    </div>" +
            "               </div>" +
            "           </div>" +
            "           </div>" +
            "   </div>";
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    SystemNoti.changeStatus = function () {
        $(".switch-systemNoti input").change(function () {
            var systemNotiId = $(this).parent().attr('id').replace("systemNoti_", "")
            $.ajax({
                type: "POST",
                url: "/api/v1/web/system/notification/changeStatus/" + systemNotiId,
                contentType: false,
                processData: false,
                dataType: "json",
                beforeSend: function () {
                    window.loader.show();
                },
                success: function (response) {
                    switch (response.status.code) {
                        case 2000: {
                            window.loader.hide();
                            window.alert.show("success", "成功", 2000);
                            break;
                        }
                    }
                }
            })
        });
    }

    SystemNoti.deleteSystemNoti = function () {
        var systemNotiId;
        $(".btn-delete-systemNoti").click(function () {
            systemNotiId = $(this).attr("id").replace("btn_deleted_", "");
        });
        $("#btn_submit_delete_system_noti").click(function () {
            jQuery.post("/api/v1/web/system/notification/delete?id=" + systemNotiId, function (response) {
                $("#systemNoti_" + response.data).remove();
                $("#delete_system_noti_modal").modal("hide");
                window.alert.show("success", "success", 1200);
            })
            SystemNoti.renderSystemNotification(sizeSystemNotification);
            setTimeout(function () {
                location.reload();
            }, 1200)
        });

    }

    SystemNoti.updateSystemNoti = function () {
        $(".btn-update-systemNoti").click(function () {
            systemNotiId = $(this).attr("id").replace("btn_update_", "");
            $("#notification_id").val(systemNotiId)
            SystemNoti.update(systemNotiId);
        });
    }


    var system_noti = new Vue({
        el: "#modal_notification",
        data: {
            validStartTime: true,
            validEndTime: true,
            validTime: true,
            validTitle: true,
            validTitleLength: true,
            validContent: true,
            validContentLength: true,
            notificationType: 0,
            isClearFile: false,
            isUpdate: false,
            invalidStartTimeMessage: "このフィールドは必須です。",
            invalidEndTimeMessage: "このフィールドは必須です。",
            invalidTimeMessage: "開始時間は終了時間より早くしてください。",
            invalidTitleMessage: "このフィールドは必須です。",
            invalidTitleLengthMessage: "100 文字以内で入力してください。",
            invalidContentMessage: "このフィールドは必須です。",
            invalidContentLengthMessage: "5000 文字以内で入力してください。",
        },
        methods: {
            updateForm: function (notification) {
                var self = this;
                if (notification.type != 1) {
                    self.notificationType = 0;
                    $("input[name='optradio'][value='0']").prop('checked', true);
//                    $("#normal_noti").prop("checked", true);
                    $("#content_color").addClass("hidden");
                    $("#title_wrapper").addClass("col-md-12");
                    $("#title_wrapper").removeClass("col-md-8");
                    $("#start_time").val(moment(notification.startTime).format(format));
                    if (notification.endTime.includes("9999")) {
                        $("#end_time").val("無期限");
                    } else {
                        $("#end_time").val(moment(notification.endTime).format(format));
                    }
                } else {
                    self.notificationType = 1;
                    $("input[name='optradio'][value='1']").prop('checked', true);
//                    $("#important_noti").prop("checked", true);
                    $("#content_color").removeClass("hidden");
                    $("#title_wrapper").removeClass("col-md-12");
                    $("#title_wrapper").addClass("col-md-8");
                    $("#start_time").val(moment(notification.startTime).format(format));
                    if (notification.endTime.includes("9999")) {
                        $("#end_time").val("無期限");
                    } else {
                        $("#end_time").val(moment(notification.endTime).format(format));
                    }
                    $(".list-block .block-color").each(function () {
                        var color = rgb2hex($(this).find("label").css("background-color"));
                        if (color == notification.color) {
                            $(".main-block .block-color span,.main-block .block-color label").remove();
                            $(".main-block .block-color").append($(this).html());
                        }
                    })
                }

                var listFileEntity = [];
                $("#container_selected_file").children().remove();
                if (notification.fileUploadSystemNotificationEntity != null) {
                    if (notification.fileUploadSystemNotificationEntity.length != 0) {
                        notification.fileUploadSystemNotificationEntity.forEach(function (e) {
                            if (e.deleted == false) {
                                var label = "<label class='selected-file'>" +
                                    "	<i class='fa fa-paperclip' style='margin-right: 5px'></i>" + e.fileUploadEntity.fileName +
                                    "   <i class='btn fa fa-remove btn-update-remove-file' id='" + e.fileUploadEntity.id + "'></i>" +
                                    "</label>"
                                listFileEntity.push(label)
                            }
                        });
                        $("#container_selected_file").append(listFileEntity)
                    }
                }
                $('input[name="upload_file_input"]').change(function (e) {
                    updateNewFiles.push(e.target.files[0]);
                });

                $(document).on('click', '.btn-update-remove-file', function () {
                    var updateRemoveFileId = $(this).attr('id');
                    updateRemoveFileIds.push(updateRemoveFileId)
                    $(this).parent().remove();
                });

                $("#title").val(notification.title);
                CKEDITOR.instances['textarea_content'].setData(notification.content);
                if (notification.typeNoti == 1) {
                    $("input[name='type_noti'][value='1']").prop('checked', true);
                }
            },
            resetForm: function () {
                $("#container_selected_file").children().remove();
                $("#start_time").val(moment().format(format));
                $("#end_time").val(" ");
                $("#title").val("");
                CKEDITOR.instances['textarea_content'].setData("");
                this.validStartTime = true;
                this.validTime = true;
                this.validTitle = true;
                this.validTitleLength = true;
                this.validContent = true;
                this.validContentLength = true;
            },
            validateForm: function () {
                this.validateTime();
                this.validateTitle();
                this.validateTitleLength();
                this.validateContent();
                this.validateContentLength();
                return this.validTitle && this.validTitleLength && this.validStartTime && this.validTime &&
                    this.validContent && this.validContentLength;
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
            validateContent: function () {
                var content = CKEDITOR.instances['textarea_content'].getData();
                if (content === null || content === undefined || content.trim() === "") {
                    this.validContent = false;
                } else {
                    this.validContent = true;
                }
            },
            validateContentLength: function () {
                var content = CKEDITOR.instances['textarea_content'].getData();
                if (content.length >= 5000) {
                    this.validContentLength = false;
                } else {
                    this.validContentLength = true;
                }
            },
            addNotification: function (e) {
                var self = this;
                e.preventDefault();
                if (this.validateForm()) {
                    notificationId = $("#notification_id").val();
                    var formData = new FormData();
                    formData.append("id", self.isUpdate ? notificationId : "");
                    formData.append("type", $('input[type=radio][name=optradio]:checked').val());
                    formData.append("isUpdate", self.isUpdate);
                    formData.append("title", $("#title").val());
                    formData.append("description", "");
                    formData.append("startTime", moment($("#start_time").val()).format(format));
                    if ($("#end_time").val != null && $("#end_time").val() != " " && $("#end_time").val() != "" && $("#end_time").val() != "無期限") {
                        formData.append("endTime", moment($("#end_time").val()).format(format));
                    } else {
                        formData.append("endTime", "9999/01/01 00:00");
                    }
                    formData.append("color", rgb2hex($(".main-block .block-color label").css("background-color")));
                    formData.append("content", CKEDITOR.instances['textarea_content'].getData());
                    for (var x = 0; x < files.length; x++) {
                        formData.append("files", files[x]);
                    }
                    for (var x = 0; x < updateRemoveFileIds.length; x++) {
                        formData.append("updateRemoveFileIds", updateRemoveFileIds[x]);
                    }
                    for (var x = 0; x < updateNewFiles.length; x++) {
                        formData.append("updateNewFiles", updateNewFiles[x]);
                    }
                    $("#btn_submit_add").prop("disabled", true);
                    window.loader.show();
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/system/notification/create",
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
        },
        mounted: function () {
            var self = this;
            configOneDate('start_time');
            configOneDate('end_time');

            $(".list-block").hide();
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
            });

            $('input[type=radio][name=optradio]').change(function () {
                if (this.value == "1") {
                    self.notificationType = 1;
                    $("#content_color").removeClass("hidden");
                    $("#title_wrapper").removeClass("col-md-12");
                    $("#title_wrapper").addClass("col-md-8");
                } else if (this.value == "0") {
                    self.notificationType = 0;
                    $("#content_color").addClass("hidden");
                    $("#title_wrapper").removeClass("col-md-8");
                    $("#title_wrapper").addClass("col-md-12");
                }
            });
            $("#btn_notification").click(function () {
                self.isUpdate = false;
                self.resetForm();
            })
        }
    });

    CKEDITOR.replace('textarea_content', {
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
    CKEDITOR.on('instanceReady', function (evt) {
        var editor = evt.editor;
        editor.on("blur", function () {
            system_noti.validateContent();
            system_noti.validateContentLength();
        })
        editor.on("change", function () {
            system_noti.validateContent();
            system_noti.validateContentLength();
        })
        editor.setData()
    });

    var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }

    SystemNoti.update = function (systemNotiId) {
        system_noti.isUpdate = true;
        jQuery.get("/api/v1/web/system/notification/detail/" + systemNotiId, function (response) {
            system_noti.updateForm(response);
        });
    }

    $("#btn_search").click(function () {
        var size = $("#select_number_system_noti option:selected").val();
        var keyword = $("#input_search").val();
        var total;
        jQuery.get("/api/v1/web/system/notification/list?page=1" + "&size=" + size + "&keyword=" + keyword, function (response) {

            var total;
            if (response.data.totalElements % size == 0) {
                total = Math.floor(response.data.totalElements / size);
            } else {
                total = Math.floor(response.data.totalElements / size) + 1;
            }
            var visible;
            if (total < 10) {
                visible = total;
            } else {
                visible = 10;
            }
            $("#list_system_noti_wrapper .list_system_noti_item").remove();
            if (response.data.content.length != 0) {
                systemNotis = response.data.content;
                for (var i = 0; i < systemNotis.length; i++) {
                    var systemNoti = systemNotis[i];
                    var html = SystemNoti.createSystemNoti(systemNoti);
                    $("#list_system_noti_wrapper").append(html);
                }
                SystemNoti.changeStatus();
                SystemNoti.updateSystemNoti();
                SystemNoti.deleteSystemNoti();

            }
            $('#pagination').twbsPagination('destroy');
            $('#pagination').twbsPagination({
                totalPages: total == 0 ? 1 : total,
                visiblePages: visible,
                onPageClick: function (event, page) {
                    getListSystemNoti(page, size, keyword);
                }
            }).on('page', function (event, page) {
            });
        })


    });


    /*upload multi file*/

    $("#btn_upload_file").click(function () {
        $("#upload_file_input").click();
    })
    $('input[name="upload_file_input"]').change(function (e) {
        var fileName = e.target.files[0].name;
        files.push(e.target.files[0]);
        var html = "<label class='selected-file'>" +
            "	<i class='fa fa-paperclip' style='margin-right: 5px'></i>" + fileName +
            "<i class='btn fa fa-remove btn-remove-file' id='" + fileName + "'></i>" +
            "</label>"
        $("#container_selected_file").append(html)
    });

    $(document).on('click', '.btn-remove-file', function () {
        var removeFile = $(this).attr('id');
        var i;
        for (i = 0; i < files.length; i++) {
            if (files[i].name == removeFile) {
                files.splice(i, 1);
            }
        }
        for (i = 0; i < updateNewFiles.length; i++) {
            if (updateNewFiles[i].name == removeFile) {
                updateNewFiles.splice(i, 1);
            }
        }
        $(this).parent().remove();
    })


})
;