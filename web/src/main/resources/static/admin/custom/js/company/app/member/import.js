$(document).ready(function () {
    let appId = $("#app_id").val();
    $("#import_member_code").on('click', function () {
        $("#file_member_input").trigger('click');
    });

    $("#file_member_input").change(function (e) {
        e.preventDefault();
        if (this.files.length < 1) {
            $("#file_member_input").val("");
            return;
        }
        if (this.files[0].size > fileSize30MB) {
            window.alert.show("error", "ファイルの最大サイズは30MBです。", 3000);
            $("#file_member_input").val("");
            return;
        }
        let formData = new FormData();
        formData.append("memberFile", this.files[0]);
        window.loader.show();
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/kusuriMember/importMember",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            error: function () {
                window.loader.hide();
            },
            success: function (response) {
                window.loader.hide();
                $("#file_member_input").val("");
                switch (response.status.code) {
                    case 1000:
                        window.alert.show("success", "データをインポート登録が完了しました、進捗は履歴画面からご確認をお願いします。", 10000);
                        historyScreen.tableHistory.ajax.reload();
                        listHistoryImport.activeTabHistory();
                        break;
                    case 1030:
                        window.alert.show("error", "インポート可能数は10万件までです。ファイルを分割し、再度インポートの実施をお願いします。", 5000);
                        break;
                    case 1031:
                        window.alert.show("error", "現在インポートできません、しばらく再インストールお願いします！", 5000);
                        break;
                    case 4:
                        window.alert.show("error", "インポートできません！", 5000);
                        break;
                }
            }
        });
    });

});







