let newCouponVue;
$(document).ready(
    function () {
        let appId = $("#app_id").val();
        newCouponVue = new Vue({
            el: "#detail_coupon_template",
            data: {
                validName: true,
                validNameLength: true,
                validDescription: true,
                validDescriptionLength: true,
                validPoint: true,
                validJanCode: true,

                messageInvalidName: " このフィールドは必須です ",
                messageInvalidNameLength: " 300 文字以内で入力してください。 ",
                messageInvalidDescription: " このフィールドは必須です ",
                messageInvalidDescriptionLength: " 500 文字以内で入力してください。 ",
                messageInvalidPoint: " このフィールドは必須です ",
                messageInvalidJanCode: "このフィールドは必須です",
            },
            methods: {
                validateForm: function () {
                    this.function_validName();
                    this.function_validDescription();
                    this.function_validPoint();
                    this.function_validNameLength();
                    this.function_validDescriptionLength();
                    this.function_validJanCode();
                    return  this.validName && this.validDescription && this.validPoint &&
                        this.validNameLength && this.validDescriptionLength
                        && this.validJanCode;
                },
                function_validJanCode: function () {
                    let regex = new RegExp("^[0-9]{12}$")
                    let value = $("#cp_jan_code").val();
                    this.validJanCode = !(value === null || value === undefined || value.trim() === "" || regex.test(value.trim()) === false);
                }, function_validName: function () {
                    let value = $("#cp_name").val();
                    if (value === null || value === undefined || value.trim() === "") {
                        this.validName = false;
                    } else {
                        this.validName = true;
                    }
                },
                function_validNameLength: function () {
                    let value = $("#cp_name").val();
                    if (value.length > 300) {
                        this.validNameLength = false;
                    } else {
                        this.validNameLength = true;
                    }
                },
                function_validDescription: function () {
                    let value = $("#cp_description").val();
                    if (value === null || value === undefined || value.trim() === "") {
                        this.validDescription = false;
                    } else {
                        this.validDescription = true;
                    }
                },
                function_validDescriptionLength: function () {
                    let value = $("#cp_description").val();
                    if (value.length > 500) {
                        this.validDescriptionLength = false;
                    } else {
                        this.validDescriptionLength = true;
                    }
                },
                function_validPoint: function () {
                    let value = $("#cp_point").val();
                    if (value === null || value === undefined || value.trim() === "") {
                        this.validPoint = false;
                    } else {
                        this.validPoint = true;
                    }
                },
                resetForm: function () {
                    $("#cp_p_kikaku").val("");
                    $("#cp_code").val("");
                    $("#cp_jan_code").val("");
                    $("#jan_13").html("");
                    $("#cp_name").val("");
                    $("#cp_description").val("");
                    $("#cp_point").val("");
                    $("#cp_category").val("");
                    $(".image-barcode .bar-code-url img").attr("src", "");
                    $(this.$refs['image_new_coupon'].$el).find("img").attr("src", "");
                    this.$refs['image_new_coupon'].hasImage = false;
                },
                detailCoupon: function (coupon) {
                    $("#cp_p_kikaku").val(coupon.pKikakuId);
                    $("#cp_code").val(coupon.code);
                    $("#cp_jan_code").val(coupon.janCode);
                    $("#jan_13").html(coupon.jan13);
                    $("#cp_name").val(coupon.name);
                    $("#cp_description").val(coupon.description);
                    $("#cp_point").val(coupon.point);
                    $("#cp_category").val(coupon.categoryId);
                    $(".image-barcode .bar-code-url img").attr("src", coupon.barCodeUrl);
                    if (coupon.imageUrl !== null) {
                        $(this.$refs['image_new_coupon'].$el).find("img").attr("src", coupon.imageUrl);
                        this.$refs['image_new_coupon'].hasImage = true;
                    }
                },
                updateCoupon: function (e) {
                    e.preventDefault();
                    if (this.validateForm()) {
                        let newCouponId = $("#new_coupon_id").val();
                        let formData = new FormData();
                        let newCouponDtoRequest = {
                            "id": newCouponId,
                            "name": $("#cp_name").val(),
                            "description": $("#cp_description").val(),
                            "categoryId": $("#cp_category").val(),
                            "pKikakuId": $("#cp_p_kikaku").val(),
                            "code": $("#cp_code").val(),
                            "janCode": $("#cp_jan_code").val(),
                            "point": $("#cp_point").val(),
                        };
                        formData.append("newCouponDtoRequest", new Blob([JSON.stringify(newCouponDtoRequest)], {type: "application/json"}));
                        formData.append("imageCoupon", this.$refs['image_new_coupon'].getSelectedFile());
                        window.loader.show();
                        $.ajax({
                            url: "/api/v1/web/" + appId + "/newCoupon/update",
                            type: "POST",
                            contentType: false,
                            processData: false,
                            data: formData,
                            success: function (response) {
                                window.loader.hide();
                                if (response.status.code === 1000) {
                                    window.alert.show("success", "登録しました。", 1000);
                                    setTimeout(function () {
                                        location.reload();
                                    }, 1200)
                                } else {
                                    window.alert.show("error", "ファイル拡張が正しくないです。.csv をアップロードしてください。", 2000);
                                }
                            },error :function () {
                                window.loader.hide();
                                window.alert.show("error", "ファイル拡張が正しくないです。.csv をアップロードしてください。", 2000);

                            }
                        })
                    }
                },
            },

        });

    });