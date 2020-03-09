$(document).ready(function () {
    let appId = $("#app_id").val();

    let $couponSettingForm = $("#coupon_setting_form");
    let $limitTimeInput = $("#limit_time");
    let $effectiveTimeInput = $("#effective_time");
    let $numberDaysUntilNextAcquisition = $("#number_days_until_next_acquisition");

    let url = window.location.toString();
    if (url.match('#')) {
        let idOfTabPane = url.split('#')[1];
        $('.nav-tabs a[href="#' + idOfTabPane + '"]').tab('show');
        autoFillSettingForm(idOfTabPane);
    }

    // Change hash for page-reload
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
        let scrollTop = $(window).scrollTop();
        window.location.hash = e.target.hash;
        $(window).scrollTop(scrollTop);
        autoFillSettingForm(e.target.hash.split('#')[1]);
    });

    initCKEditor('note_content');

    $couponSettingForm.validate({
        errorElement: "p",
        errorClass: "error-message",
        errorPlacement: function (error, element) {
            error.insertBefore(element);
        },
        ignore: [],
        rules: {
            limit_time: {
                required: true,
                minStrict: 0,
                number: true
            },
            effective_time: {
                required: true,
                minStrict: 0,
                number: true
            },
            number_days_until_next_acquisition: {
                required: true,
                minStrict: 0,
                number: true
            },
            note_content: {
                required_ckEditor: true
            }
        },
        messages: {},
        submitHandler: function () {
        }
    });

    $.validator.addMethod("required_ckEditor",
        function (value, element) {
            let data = CKEDITOR.instances[$(element).attr("id")].getData();
            return data !== null && data !== undefined && $(data).text().trim() !== "";
        }, "このフィールドは必須です。");

    $.validator.addMethod('minStrict', function (value, el, param) {
        return value > param;
    }, "0 以上の値を入力してください。");

    $("#btn_submit_coupon_setting").click(function () {
        if ($couponSettingForm.valid()) {
            //submit form function
            let data = getSettingCouponInfo();
            if (parseInt(data.effectiveTime, 10) > parseInt(data.numberDaysUntilNextAcquisition, 10)) {
                // window.alert.show("error", "ポイントプラスクーポンのクーポン自動付与からの有効期限設定はポイントプラスクーポン獲得日から次回獲得可能となるまでの日数よりも小さいです！", 2000);
                window.alert.show("error", "次回発行クーポンの期間は有効期間以上に設定が必須です。", 2000);
                return;
            }
            $.ajax({
                type: "POST",
                url: "/api/v1/web/" + appId + "/coupon_setting/save",
                data: JSON.stringify(getSettingCouponInfo()),
                contentType: "application/json",
                beforeSend: function () {
                    window.loader.show();
                },
                success: function (response) {
                    console.log(response);
                    window.loader.hide();
                    if (response.status.code === 2000) {
                        window.alert.show("success", "成功", 2000);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000)
                    } else if (response.status.code === 4) {
                        window.alert.show("error", "ポイントプラスクーポンのクーポン自動付与からの有効期限設定は不正です。最大値は"+response.data+"日です。", 2000);
                    } else {
                        window.alert.show("error", "申し訳ありません。エラーです。しばらくしてからもう一度お試しください", 2000);
                    }
                }
            })
        }
    });

    function getSettingCouponInfo() {
        return {
            limitTime: $limitTimeInput.val(),
            effectiveTime: $effectiveTimeInput.val(),
            numberDaysUntilNextAcquisition: $numberDaysUntilNextAcquisition.val(),
            note: CKEDITOR.instances['note_content'].getData()
        }
    }

    function fillSettingInfo() {
        $.ajax({
            type: "get",
            url: "/api/v1/web/" + appId + "/coupon_setting/info",
            async: false,
            beforeSend: function () {
                window.loader.show();
            },
            success: function (response) {
                window.loader.hide();
                let settingCouponInfo = response.data;
                if (settingCouponInfo != null) {
                    $limitTimeInput.val(settingCouponInfo.limitTime);
                    $effectiveTimeInput.val(settingCouponInfo.effectiveTime);
                    $numberDaysUntilNextAcquisition.val(settingCouponInfo.numberDaysUntilNextAcquisition);
                    setTimeout(function () {
                        CKEDITOR.instances['note_content'].setData(settingCouponInfo.note, function () {
                            $couponSettingForm.valid();
                        });
                    }, 10);
                }
            }
        })
    }

    function autoFillSettingForm(idOfTabPane) {
        if (idOfTabPane === 'coupon_setting') {
            fillSettingInfo();
        }
    }
});
