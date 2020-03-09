$(document).ready(function () {
    let appId = $("#app_id").val();
    $("#import_csv_file ").on('click', function () {
        $("#file_otp_import").trigger('click');
    });

    $("#file_otp_import").change(function (e) {
        e.preventDefault();
        if (this.files.length < 1) {
            $("#file_otp_import").val("");
            return;
        }
        if (this.files[0].size > fileSize30MB) {
            window.alert.show("error", "ファイルの最大サイズは30MBです。", 3000);
            $("#file_otp_import").val("");
            return;
        }
        let formData = new FormData();
        formData.append("otpFile", this.files[0]);
        window.loader.show();
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/whiteListOTP/import",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            error: function () {
                window.loader.hide();
            },
            success: function (response) {
                window.loader.hide();
                $("#file_otp_import").val("");
                switch (response.status.code) {
                    case 1000:
                        window.alert.show("success", "データをインポート登録が完了しまし。", 5000);
                        listWhiteListOTP.OTPTable.ajax.reload();
                        break;
                    case 1030:
                        window.alert.show("error", "インポート可能数は1000件までです。ファイルを分割し、再度インポートの実施をお願いします。", 5000);
                        break;
                    case 4:
                        window.alert.show("error", "インポートできません！", 5000);
                        break;
                }
            }
        });
    });

    $("#down_load_template").click(function () {
        window.open("/api/v1/web/" + appId + "/whiteListOTP/downloadTemplate", '_blank');
    })

});







