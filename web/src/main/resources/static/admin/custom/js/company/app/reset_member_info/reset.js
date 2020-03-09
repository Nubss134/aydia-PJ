$(document).ready(function () {
    let appId = $("#app_id").val();

    $(document).on('click', "#btn_reset_member_info", function () {
        let memberCode = $("#input_member_code").val();
        if (memberCode == null || memberCode == undefined || memberCode.trim().length == 0 || !checkValidMemberCode(memberCode)) {
            $("#required_member_code").removeClass("hidden")
        } else {
            $("#required_member_code").addClass("hidden");
            $.ajax({
                url: "/api/v1/web/" + appId + "/member/resetMemberInfo/?memberCode=" + memberCode,
                type: "POST",
                success: function (response) {
                    if (response.status.code === 1000) {
                        window.alert.show('success', '入力した会員番号の生年月日、携帯電話番号をリセットしました。', 2000);
                    } else if (response.status.code === 4) {
                        window.alert.show('error', '会員番号が存在せずリセットできません。', 2000);
                    } else {
                        window.alert.show('error', '予期せぬエラーが発生しました。システム管理者までお問い合わせください。', 2000);
                    }
                }
            })
        }
    })

    function checkValidMemberCode(memberCode) {
        return memberCode.match(/[0-9]+/) && memberCode.length == 16;
    }

});