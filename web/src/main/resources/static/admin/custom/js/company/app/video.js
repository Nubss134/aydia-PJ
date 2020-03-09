$(document).ready(function () {
    var appId = $("#app_id").val();
    var url = "/api/v1/web/" + appId + "/video/list";
    var columnDefinitions = [
        {"data": "createdTime", "orderable": true, "defaultContent": "<i>データなし</i>", "class": "text-center"},
        {"data": "name", "defaultContent": "<i>データなし</i>"},
        {"data": "url", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": "numberMemberUnique", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": "numberNotMemberUnique", "class": "text-center", "orderable": false, "defaultContent": "<i>データなし</i>"},
        {"data": "id", "orderable": false, "defaultContent": "<i>データなし</i>", "class": "text-center"}
    ];
    var videoTable = configDataTableServerSide({
        element: "#video_table",
        url: url,
        columnDefinitions: columnDefinitions,
        columnOrder: 0,
        columnDefs: [
            {
                "render": function (data) {
                    return '<button style="margin-right: 5px;" class="btn btn-primary btn-sm btn-update-video" id="btn_update_' + data + '" data-toggle="modal" data-target="#modal_update_video" >詳細</button>' +
                        '<button style="margin-right: 5px;" class="btn btn-primary btn-sm btn-download-member-click" id="btn_download_member_click_' + data + '" >ダウンロード</button>' +
                        '<button class="btn btn-danger btn-sm btn-delete" id="btn_delete_' + data + '" data-toggle="modal" data-target="#modal_delete_video" >削除</button>';
                },
                "targets": 5
            },
            {
                "render": function (data) {
                    return ' <a class="text-underline" target="_blank" href=" ' + data + ' " >' + data + ' </a> ';
                },
                "targets": 2
            }
        ],
        fnRowCallback: function (nRow, aData) {
            if (aData.url == null || aData.url == '') {
                $('td:eq(1)', nRow).html('<div class="" > <p style="font-weight: bold; padding-top:6%" > ' + aData.name + '</p> </div>');
            } else {
                var url = aData.url;
                var youtubeId = url.replace("https://www.youtube.com/watch?v=", "").replace("http://www.youtube.com/watch?v=", "");
                var youtubeImgUrl = "https://img.youtube.com/vi/" + youtubeId + "/default.jpg";

                var htmlBuilder = '<div> <img src="' + youtubeImgUrl + '" /></div><p style="text-align: center"><b>' + aData.name + '</b></p>'
                $('td:eq(1)', nRow).html(htmlBuilder);
            }
        }
    });

    var validateAddVideo = $("#form_add_video").validate({
        errorElement: "p",
        errorClass: "error-message",
        focusInvalid: false,
        ignore: ".hidden",
        rules: {
            name: {
                required: true,
                maxlength: 100
            },
            url: {
                required: true,
                youtubeLink: true
            }
        },

        messages: {},
        errorPlacement: function (error, element) {
            $(element).before(error);
        },
        submitHandler: function (form, event) {
            var data = {
                "name": $("#name").val(),
                "url": $("#url").val(),
            }
            $.ajax({
                type: "POST",
                url: "/api/v1/web/" + appId + "/video/add",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $("#btn_submit_add").attr('disabled', true);
                },
                success: function (response) {
                    switch (response.status.message) {
                        case "SUCCESS": {
                            $('html,body').animate({
                                scrollTop: 0
                            }, 300);

                            window.alert.show("success", "動画を作成しました。", 2000);
                            setTimeout(function () {
                                $(".message-add").hide();
                                location.reload();
                            }, 2000);

                            break;
                        }

                        case "ERROR": {
                            $(".message-add").addClass("hidden");
                            $(".message-add").addClass("alert-warning");
                            $(".message-add").removeClass("hidden");
                            $(".message-add").html(response.status.message);
                            $("#btn_submit_add").attr('disabled', false);
                            break;
                        }
                    }
                }
            })

        }

    })

    $(".btn-update-video").on('click', function () {
        $("#video_id").val($(this).attr('id').replace("btn_update_", ""));
    })

    $(document).on("click", ".btn-download-member-click", function () {
        var videoId = $(this).attr("id").replace("btn_download_member_click_", "");
        var href = "/api/v1/web/" + appId + "/video/downloadMemberCLickVideoCSV/" + videoId;
        window.location.href = href;
    });

    var validateUpdateVideo = $("#form_update_video").validate({
        errorElement: "p",
        errorClass: "error-message",
        focusInvalid: false,
        ignore: ".hidden",
        rules: {
            name: {
                required: true,
                maxlength: 100,
            },
            url: {
                required: true,
                youtubeLink: true
            }
        },

        messages: {},
        errorPlacement: function (error, element) {
            $(element).before(error);
        },
        submitHandler: function (form, event) {
            var data = {
                "id": $("#video_id").val(),
                "name": $("#name_update").val(),
                "url": $("#url_update").val()
            }
            $.ajax({
                type: "POST",
                url: "/api/v1/web/" + appId + "/video/update",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $("#btn_submit_update").attr('disabled', true);
                },
                success: function (response) {
                    switch (response.status.message) {
                        case "SUCCESS": {
                            $('html,body').animate({
                                scrollTop: 0
                            }, 300);
                            window.alert.show("success", "動画を更新しました。", 2000);
                            setTimeout(function () {
                                $(".message-update").hide();
                                location.reload();
                            }, 2000);

                            break;
                        }

                        case "ERROR": {
                            break;
                        }
                    }
                }
            })
        }

    })


    videoTable.on('draw', function () {
        getUpdateModal();
        getDeleteModal();
        submitDelete();
    })

    function getUpdateModal() {
        $('.btn-update-video').on('click', function () {
            validateUpdateVideo.resetForm();
            var id = $(this).attr('id');
            id = id.replace('btn_update_', '');

            $("#video_id").val(id)
            jQuery.get("/api/v1/web/" + appId + "/video/detail/" + id, function (response) {

                $("#name_update").val(response.name);
                $("#url_update").val(response.url);

                if (!response.openWithWebview) {
                    $("#open_with_webview").prop('checked', false);
                    $("#open_with_browser").prop('checked', true);

                } else {
                    $("#open_with_browser").prop('checked', false);
                    $("#open_with_webview").prop('checked', true);

                }

            });
        })
    }


    function getDeleteModal() {
        $('.btn-delete').on('click', function () {
            var id = $(this).attr('id');
            id = id.replace('btn_delete_', '');
            console.log(id);
            $("#video_id").val(id)
        })
    }

    $('.btn-add').on('click', function () {
        $("#form_add_video").validate().resetForm();
    });

    function submitDelete() {
        $('#btn_submit_delete').on('click', function () {
            var videoId = $("#video_id").val();

            $.ajax({
                type: "POST",
                url: "/api/v1/web/" + appId + "/video/delete/" + videoId,
                success: function (response) {
                    switch (response.status.message) {
                        case "SUCCESS": {
                            $('html,body').animate({
                                scrollTop: 0
                            }, 300);
                            window.alert.show("success", "動画を削除しました。", 2000);

                            setTimeout(function () {
                                $(".message-delete").hide();
                                location.reload();
                            }, 2000);
                            break;
                        }

                        case "ERROR": {
                            break;
                        }
                    }
                }
            })
        })
    }


})