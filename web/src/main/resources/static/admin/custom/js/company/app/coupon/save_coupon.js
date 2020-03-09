let SaveCoupon = {};
$(document).ready(function () {

    let appId = $("#app_id").val();
    SaveCoupon.saveCouponModal = {
        hasErrorStore: false,
        operationType: "ADD",
        imageFile: null,
        usageCodeFile: null,
        hasUsageCode: false,
        validator: null,
        couponEntity: {
            id: null,
            name: null,
            usageScope: null,
            hasUsageCode: false,
            usagePolicy: null,
            activeTime: null,
            expireTime: null,
            timeReuse: null,
            imageUrl: null,
            shortDescription: null,
            longDescription: null
        },
        resetCouponEntry: function () {
            this.couponEntity = {
                id: null,
                usageScope: null,
                usagePolicy: null,
                name: null,
                activeTime: null,
                expireTime: null,
                imageUrl: null,
                hasUsageCode: false,
                shortDescription: null,
                longDescription: null,
            };
        },
        reset: function () {
            this.imageFile = null;
            this.couponEntity = {
                id: null,
                usageScope: null,
                usagePolicy: null,
                name: null,
                activeTime: null,
                expireTime: null,
                imageUrl: null,
                hasUsageCode: false,
                shortDescription: null,
                longDescription: null,
            };
            this.usageCodeFile = null;

        },
        show: function (operationType, usageScope, hasUsageCode) {
            this.operationType = operationType;
            this.reset();
            if (usageScope === "EVERYONE") {
                this.couponEntity.usageScope = "EVERYONE";
                $("#usage_scope_label").html("全員");
            } else if (usageScope === "MEMBER") {
                this.couponEntity.usageScope = "MEMBER";
                $("#usage_scope_label").html("会員限定");
            }

            if (hasUsageCode === true) {
                $("#has_usage_code_label").html("有り");
                this.hasUsageCode = true;
                this.couponEntity.hasUsageCode = true;
            } else {
                $("#has_usage_code_label").html("なし");
                this.hasUsageCode = false;
                this.couponEntity.hasUsageCode = false;
            }

            $("#import_store,#import_one_usage_code,#import_usage_code,#image_preview_form_group").addClass("hidden");

            if (hasUsageCode === true && (usageScope === "EVERYONE" || usageScope === "MEMBER")) {
                $("#import_one_usage_code").removeClass("hidden");
                $("#image_preview_form_group").removeClass("hidden");
            } else if (hasUsageCode === true && usageScope === "SHOP_ONLY") {
                $("#import_usage_code").removeClass("hidden");
            } else if (hasUsageCode === false && usageScope === "SHOP_ONLY") {
                $("#import_store").removeClass("hidden");
            }

            if (operationType === "UPDATE") {
                $("#preview_campaign_image").removeClass("hidden");
                $("#choose_image_btn").addClass("hidden");
                $("#remove_image_btn").removeClass("hidden");
            } else {
                $("#preview_campaign_image").addClass("hidden");
                $("#image_preview_form_group").addClass("hidden");
                $("#choose_image_btn").removeClass("hidden");
                $("#remove_image_btn").addClass("hidden");

                $("#short_description_input").val("");
                CKEDITOR.instances['long_description_input'].setData("");
                $("#name_input").val("");
                // $("#tag_select").val('').change();
                $("#usage_code_file_name").html("");
                $("#preview_campaign_image").val("");
                $("#image_file_input").val("");
            }

            $("#save_coupon_modal").modal();


        }, // end show method
        hide: function () {
            $("#save_coupon_modal").modal("hide");
        },
        renderCampaignImage: function (file) {
            let validImageTypes = ["image/jpeg", "image/png"];
            if (validImageTypes.indexOf(file.type) < 0) {
                window.alert.show("error", "ファイル拡張が正しくないです。.JPG, .PNG をアップロードしてください。", 3000);
                return;
            }
            let img = $("#preview_campaign_image").get(0);
            let fileReader = new FileReader();
            fileReader.onload = function (e) {
                img.src = e.target.result;
                $("#preview_campaign_image").removeClass("hidden");
            };
            fileReader.readAsDataURL(file);
            img.title = file.name;
        },
        clearCampaignImage: function () {
            this.imageFile = null;
            this.couponEntity.imageUrl = null;
            $("#image_file_input").val("");
            $("#preview_campaign_image").addClass("hidden");
        },
        clearCouponUsageCode: function () {
            this.usageCodeFile = null;
            $("#upload_one_usage_code_file_input").val("");
        },
        setCouponEntry: function (couponEntity) {
            this.couponEntity = couponEntity;
            $("#name_input").val(couponEntity.name);
            $("#active_time_input").val(couponEntity.activeTime);
            $("#expire_time_input").val(couponEntity.expireTime);
            setStartDateForDatePicker("active_time_input");
            setStartDateForDatePicker("expire_time_input");
            $("#reuse").val(couponEntity.timeReuse);
            $("#usage_policy_select").val(couponEntity.usagePolicy);
            $("#usage_scope_label").html(couponEntity.usageScope);
            $("#short_description_input").val(couponEntity.shortDescription);
            $("#preview_campaign_image").prop("src", couponEntity.imageUrl);
            $("#preview_campaign_image").removeClass("hidden");
            CKEDITOR.instances['long_description_input'].setData(couponEntity.longDescription);

        },
        setUsageCodeFile: function (usageCodeFile) {
            $("#preview_usage_code_image").prop("src", usageCodeFile.fileUrl);
            $("#usage_code_file_name").removeClass("hiden");
            $("#import_one_usage_code").removeClass("hidden");
        },
        init: function () {
            let self = this;
            $("#save_coupon_modal").on("hidden.bs.modal", function () {
                self.reset();
            });

            if (CKEDITOR.instances['long_description_input'] != null) {
                CKEDITOR.instances['long_description_input'].destroy();
            }

            CKEDITOR.replace('long_description_input', {
                language: 'ja'
            });

            CKEDITOR.config.toolbar = [
                ['Styles', 'Format', 'Font', 'FontSize'],
                ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print'],
                ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                ['Image', 'Table', '-', 'Link', 'Flash', 'Smiley', 'TextColor', 'BGColor', 'Source']
            ];
            $("#time_picker_icon").on('click', function () {
                $('#time_picker').click();
            });

            $("#usage_policy_select").on("change", function () {
                let value = $(this).val();
                if (value === "COUNTLESS_TIME") {
                    $("#time_reuse").removeClass("hidden");
                } else {
                    $("#time_reuse").addClass("hidden");
                }
            })

            configOneDate('active_time_picker');
            configOneDate('expired_time_picker');

            $("#active_time_picker, #expired_time_picker").on("hide.daterangepicker", function () {
                self.validator.element("#active_time_input");
                self.validator.element("#expire_time_input");
            });

            $("#upload_one_usage_code_btn").click(function (e) {
                e.preventDefault();
                $("#upload_one_usage_code_file_input").val("");
                $("#upload_one_usage_code_file_input").trigger("click");

            });

            $("#upload_one_usage_code_file_input").change(function () {
                if (this.files.length < 1) {
                    $("#upload_one_usage_code_file_input").val("");
                    $("#usage_code_file_name").html("");
                    self.clearCouponUsageCode();
                    return;
                }
                let fileReader = new FileReader();
                let validImageTypes = ["image/jpeg", "image/png"];

                if (validImageTypes.indexOf(this.files[0].type) < 0) {
                    window.alert.show("error", "ファイル拡張が正しくないです。.JPG, .PNG をアップロードしてください。", 3000);
                    self.clearCouponUsageCode();
                    return;
                }

                if (this.files[0].size > fileSize3MB) {
                    window.alert.show("error", "ファイルの最大サイズは３MBです。", 3000);
                    self.usageCodeFile = null;
                    return;
                }

                let img = $("#image_preview_form_group").find("img").get(0);
                fileReader.onload = function (e) {
                    img.src = e.target.result;
                    $("#image_preview_form_group").removeClass("hidden");
                };
                fileReader.readAsDataURL(this.files[0]);

                self.usageCodeFile = this.files[0];
                $("#usage_code_file_name").html(this.files[0].name);

                let validator = $("#form_add_coupon").validate();
                validator.element("#upload_one_usage_code_file_input")
            });


            $("#upload_usage_code_btn").click(function (e) {
                e.preventDefault();
                $("#upload_usage_code_file_input").val("");
                $("#upload_usage_code_file_input").trigger("click");
            });

            $("#import_store_btn").click(function (e) {
                e.preventDefault();
                $("#import_store_file_input").trigger("click");
            });

            $("#choose_image_btn").click(function (e) {
                e.preventDefault();
                $("#image_file_input").val("")
                $("#image_file_input").trigger("click");

            });

            $("#remove_image_btn").click(function (e) {
                e.preventDefault();
                $("#image_file_input").val("")
                self.clearCampaignImage();
                $("#choose_image_btn").removeClass("hidden");
                $("#remove_image_btn").addClass("hidden");
                $("#image_file_input").val("")
            });

            $("#image_file_input").change(function () {

                if (this.files.length < 1) {
                    self.clearCampaignImage();
                    return;
                } else {
                    let validImageTypes = ["image/jpeg", "image/png"];
                    if (validImageTypes.indexOf(this.files[0].type) < 0) {
                        self.clearCampaignImage();
                        window.alert.show("error", "ファイル拡張が正しくないです。.JPG, .PNG をアップロードしてください。", 3000);
                        return;
                    } else if (this.files[0].size > fileSize3MB) {
                        self.clearCampaignImage();
                        window.alert.show("error", "ファイルの最大サイズは３MBです。", 3000);
                        return;
                    } else {
                        self.imageFile = this.files[0];
                        self.renderCampaignImage(this.files[0]);
                        $("#choose_image_btn").addClass("hidden");
                        $("#remove_image_btn").removeClass("hidden");
                    }
                }

                let validator = $("#form_add_coupon").validate();
                validator.element("#image_file_input");
            });

            $.validator.addMethod("afterActiveTime", function (value, element) {
                let isValid = value > moment($("#active_time_input").val()).format("YYYY/MM/DD HH:mm");
                return isValid;
            }, "開始時間は終了時間 より早くしてください。");

            $.validator.addMethod("beforeExpiredTime", function (value, element) {
                let isValid = value < moment($("#expire_time_input").val()).format("YYYY/MM/DD HH:mm");
                return isValid;
            }, "開始時間は終了時間 より早くしてください。");

            self.validator = $("#form_add_coupon").validate({
                errorElement: "p",
                errorClass: "error-message",
                focusInvalid: false,
                ignore: "",
                rules: {
                    name: {
                        required: true,
                        maxlength: 100
                    },
                    activeTime: {
                        required: true,
                        beforeExpiredTime: true,
                    },
                    expiredTime: {
                        required: true,
                        afterActiveTime: true
                    },
                    image: {
                        required: function () {
                            let isRemoveImageWhenUpdate = self.operationType === "UPDATE" && self.imageFile === null && self.couponEntity.imageUrl === null;
                            return self.operationType === "ADD" || isRemoveImageWhenUpdate;
                        }
                    },
                    short_desc: {
                        required: true,
                        maxlength: 255,
                    },
                    one_usage_code: {
                        required: function () {
                            let code = SaveCoupon.saveCouponModal.couponEntity.hasUsageCode;
                            let scope = SaveCoupon.saveCouponModal.couponEntity.usageScope;
                            return code === true && (scope === "EVERYONE" || scope === "MEMBER") && self.operationType === "ADD";
                        }
                    },
                    reuse: {
                        required: function () {
                            return $("#usage_policy_select").val() === "COUNTLESS_TIME";
                        }
                    },
                    long_description_input: {
                        ckeditorMaxLength: "long_description_input"
                    }
                },
                errorPlacement: function (error, element) {
                    $(element).before(error);
                    if (element.attr("name") === "activeTime") {
                        error.insertBefore("#active_time_picker");
                    }
                    if (element.attr("name") === "expiredTime") {
                        error.insertBefore("#expired_time_picker");
                    }
                },
                submitHandler: function () {
                    let code = SaveCoupon.saveCouponModal.couponEntity.hasUsageCode;
                    let scope = SaveCoupon.saveCouponModal.couponEntity.usageScope;
                    if (self.operationType === "ADD") {
                        if (UploadUsageCode.numInvalidFile === 0) {
                            self.save();
                        } else {
                            window.alert.show("error", "間違っているチラシファイル名を修正してください。", 1200)
                        }
                    } else if (self.operationType === "UPDATE") {
                        SaveCoupon.saveCouponModal.hasErrorStore = false;
                        if (SaveCoupon.saveCouponModal.hasErrorStore) {
                            window.alert.show("error", "店舗情報が間違っています。", 2500);
                            return;
                        }
                        self.update();
                    } else {
                        console.error("In-valid operationType ", self.operationType);
                    }
                }
            });
            // });
        }, // end init method

        getCouponEntity: function () {

            this.couponEntity.name = $("#name_input").val();
            this.couponEntity.usagePolicy = $("#usage_policy_select").val();
            this.couponEntity.timeReuse = $("#reuse").val();
            if (this.couponEntity.usagePolicy !== "COUNTLESS_TIME") {
                this.couponEntity.timeReuse = 0;
            }
            this.couponEntity.shortDescription = $("#short_description_input").val();
            this.couponEntity.longDescription = CKEDITOR.instances['long_description_input'].getData();
            this.couponEntity.activeTime = moment($("#active_time_input").val()).format("YYYY/MM/DD HH:mm");
            this.couponEntity.expireTime = moment($("#expire_time_input").val()).format("YYYY/MM/DD HH:mm");
            this.couponEntity.appId = appId;
            return this.couponEntity;

        },
        save: function () {
            let self = this;
            let formData = new FormData();
            let requestUrl = "/api/v1/web/" + appId + "/couponEntity/addWithUsageCode";
            let couponEntity = this.getCouponEntity();
            let couponEntityBlob = new Blob([JSON.stringify(couponEntity)], {type: "application/json"});
            formData.append('couponEntity', couponEntityBlob);
            formData.append("imageFile", self.imageFile);

            $.ajax({
                url: requestUrl,
                type: "POST",
                processData: false,
                contentType: false,
                headers: {
                    "Content-Type": undefined
                },
                data: formData,
                beforeSend: function () {
                    window.loader.show();
                },
                success: function () {
                    window.loader.hide();
                    window.alert.show("success", "クーポンを作成しました", 1500);
                    self.hide();
                    ListCoupon.couponTable.ajax.reload(null);
                }

            });

        },
        update: function () {
            let self = this;
            let couponEntity = this.getCouponEntity();
            let formData = new FormData();
            let couponEntityBlob = new Blob([JSON.stringify(couponEntity)], {type: "application/json"});
            formData.append('couponEntity', couponEntityBlob);

            if (couponEntity.hasUsageCode) {
                let usageCodeFiles = UploadUsageCode.getNotSavedUsageCode();
                if (couponEntity.usageScope === "SHOP_ONLY") {
                    for (let i = 0; i < usageCodeFiles.length; i++) {
                        formData.append("usageCodeFiles[]", usageCodeFiles[i]);
                    }
                } else {
                    formData.append("usageCodeFiles[]", self.usageCodeFile);
                }
                let deletedCouponIds = UploadUsageCode.getDeletedCouponIds();
                formData.append("deletedCouponIds[]", new Blob([JSON.stringify(deletedCouponIds)], {type: "application/json"}));
                let editedCoupons = UploadUsageCode.getEditedCoupons();
                console.log(JSON.stringify(editedCoupons));
                formData.append("editedCoupons[]", new Blob([JSON.stringify(editedCoupons)], {type: "application/json"}));

            } else if (couponEntity.usageScope === "SHOP_ONLY") {
                for (let i = 0; i < deleteStoreIds.length; i++) {
                    formData.append("deleteStoreIds[]", deleteStoreIds[i]);
                }
                let storeIds = ImportStore.getStoreIds();
                for (let i = 0; i < storeIds.length; i++) {
                    formData.append("storeIds[]", storeIds[i]);
                }
            }

            formData.append("imageFile", this.imageFile);
            $.ajax({

                url: "/api/v1/web/" + appId + "/couponEntity/update",
                type: "POST",
                processData: false,
                contentType: false,
                headers: {
                    "Content-Type": undefined
                },
                data: formData,
                beforeSend: function () {
                    window.loader.show();
                },
                success: function (response) {
                    window.loader.hide();
                    window.alert.show("success", "クーポンを更新しました。", 1500);
                    self.hide();
                    ListCoupon.couponTable.ajax.reload(null);
                }

            });

        }
    }

    SaveCoupon.saveCouponModal.init();

    $(document).on('click', '#continue_add_coupon_btn', function () {
        $("#form_add_coupon").validate().resetForm();
    });

    $(document).on('click', '.btn-update', function () {
        $("#form_add_coupon").validate().resetForm();
    });

    CKEDITOR.on('instanceReady', function (evt) {
        let editor = evt.editor;
        let validator = $("#form_add_coupon").validate();
        editor.on("blur", function () {
            validator.element("#long_description_input")

        })
        editor.on("change", function () {
            validator.element("#long_description_input")

        })
    });

    //config date:
    configOneDate('active_time_input');
    configOneDate('expire_time_input');
});
