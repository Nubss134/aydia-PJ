$(document).ready(function () {
    let appId = $("#app_id").val();
    $(document).on('click', '#add_black_member', function () {
        let memberCode = $("#input_member_code").val().trim();
        if (memberCode === "") {
            window.alert.show('error', "会員コードを入力してください。", 1500);
            return;
        } else {
            $("#modal_add_black_member").modal();
        }
    })
    $("#btn_submit_add_member").on('click', function () {
        let memberCode = $("#input_member_code").val().trim();
        $.ajax({
            url: "/api/v1/web/" + appId + "/member/addBlackMember/" + memberCode,
            type: "POST",
            success: function (response) {
                $("#modal_add_black_member").modal("hide");
                if (response.status.code === 1000) {
                    window.alert.show('success', '会員保存しました。', 1500);
                    setInterval(function () {
                        location.reload();
                    }, 1500)
                } else if (response.status.code === 4) {
                    window.alert.show('error', 'エラーが発生しました。しばらく待ってからもう一度お試してください。', 1500);
                } else {
                    window.alert.show('error', '会員番号を見つけませんでした。', 1500);
                }
            }
        })
    })

    $(document).on('click', ".btn_delete_member", function () {
        var memberCode = $(this).data('id');
        $("#btn_submit_delete_member").on('click', function () {
            $.ajax({
                url: "/api/v1/web/" + appId + "/member/deleteBlackMember/" + memberCode,
                type: "POST",
                success: function (response) {
                    $("#modal_add_black_member").modal("hide");
                    if (response.status.code === 1000) {
                        window.alert.show('success', '会員を削除しました。', 1500);
                        setInterval(function () {
                            location.reload();
                        }, 1500)
                    } else if (response.status.code === 4) {
                        window.alert.show('error', 'エラーが発生しました。しばらく待ってからもう一度お試してください。', 1500);
                    } else {
                        window.alert.show('error', '会員番号を見つけませんでした。', 1500);
                    }
                },
                error: function () {
                    window.alert.show('error', 'エラーが発生しました。しばらく待ってからもう一度お試してください。', 1500);
                }
            })
        })
    })

    $("#import_black_member").click(function () {
        $("#input_file").trigger("click");
    })

    $('input[name="input_file_black_member"]').change(function (e) {
        var formData = new FormData();
        formData.append("csvFile", this.files[0]);
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/member/importBlackMemberCode",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                window.loader.show();
            },
            success: function (response) {
                window.loader.hide();
                if (response.status.code === 1000) {
                    window.alert.show('success', '追加しました、会員数は' + response.data + ' です。', 1500)
                    setInterval(function () {
                        location.reload()
                    }, 1500)
                } else {
                    window.alert.show('error', 'エラーが発生しました。しばらく待ってからもう一度お試してください。', 1500);
                }
            },
            error: function () {
                window.loader.hide();
                window.alert.show('error', 'エラーが発生しました。しばらく待ってからもう一度お試してください。', 1500);
            }
        });
    });


})