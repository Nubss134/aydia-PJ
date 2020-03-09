$(document).ready(function () {
    let appId = $("#app_id").val();
    let pKikakuId = $("#p_kikaku_id").val();
    $("#download_template_member_code").on('click', function () {
        window.open("/api/v1/web/" + appId + "/pushNotification/downloadFileCSVTemplate");
    });
    let csvFile = null;


    let importMemberCodeButton = $("#import_member_code");
    let importMemberCodeInput = $("#import_member_code_input");

    importMemberCodeButton.click(function () {
        importMemberCodeInput.click();
    });

    importMemberCodeInput.change(function () {
        let fileExtension = ["csv"];
        if (this.files[0].length < 1) {
            return;
        }
        if ($.inArray(importMemberCodeInput.val().split('.').pop().toLowerCase(), fileExtension) === -1) {
            window.alert.show("error", 'CSVファイルのみです！', 1500);
            return;
        }
        csvFile = this.files[0];
        importMemberCodeInput.val(null);
        let nameDisplay = csvFile.name + "(インポート中)";
        $("#import_member_code_file_name").val(nameDisplay);
        return false;
    });

    $("#update_p_kikaku_info").on('click', function () {
        let formData = new FormData();
        formData.append("startTime", $("#start_time_p_kikaku").val());
        formData.append("endTime", $("#end_time_p_kikaku").val());
        formData.append("pKikakuId", pKikakuId);
        if (csvFile != null) {
            formData.append("csvFile", csvFile);
        }
        if ($('#number_user_can_use').length !== 0) {
            formData.append("numberUserCanUse", $('#number_user_can_use').val());
        }
        window.loader.show();
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/pKikaku/updateInfoInCouponScreen",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                window.loader.show();
            },
            success: function (response) {
                window.loader.hide();
                if (response.status.code === 1000) {
                    window.alert.show("success", '企画の情報を変更しました！', 1500);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500)
                } else if (response.status.code === 1027) {
                    window.alert.show("error", "入力した終了時間は開始時間より前の時刻です。", 2000);
                } else {
                    window.alert.show("error", "申し訳ありません。エラーです。しばらくしてからもう一度お試しください", 2000);
                }

            }
        })
    });
});