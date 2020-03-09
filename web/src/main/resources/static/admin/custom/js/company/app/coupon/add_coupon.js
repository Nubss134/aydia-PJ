let coupon = {};
$(document).ready(function () {
    let appId = $("#app_id").val();
    let format = "YYYY/MM/DD HH:mm";
    coupon.couponVue = new Vue({
        el: "#save_coupon_modal",
        data: {
            //date
            id: null,
            usagePolicy: "ONCE_TIME_PER_DAY",
            usageScope: null,
            textUsageScope: null,
            type: null,
            textType: null,
            name: "",
            startTime: "",
            endTime: "",
            setMemberCodes: [],
            timeReuse: 0,
            shortDescription: "",
            longDescription: null,
            listUsagePolicy: [
                {key: 'ONCE_TIME_PER_DAY', value: '1日に1回'},
                {key: 'ONCE_TIME', value: '1回'},
                {key: 'COUNTLESS_TIME', value: '無制限'},
            ],
            //status validate
            validName: true,
            validNameLength: true,
            validStartTime: true,
            validEndTime: true,
            validHasMemberCode : true,
            validTime: true,
            validTimeReuse: true,
            validTimeReuseValue: true,
            validMemberCodeInput: true,
            validMemberCodeInputExist: true,
            validImage: true,
            validShortDescription: true,
            validShortDescriptionLength: true,
            validBarCode: true,
            //message validate
            messageInvalidHasMemberCode: "会員番号一覧は空にできません。",
            invalidMessage: "このフィールドは必須です。",
            invalidNameLengthMessage: "100 文字以内で入力してください。",
            invalidTimeMessage: "開始時間は終了時間より早くしてください。",
            invalidTimeReuseMessage: "再使用時間は０ー１０００分。",
            invalidShortDescriptionMessage: "500 文字以内で入力してください。",
            isUpdate: false
        },
        methods: {
            resetForm: function () {
                $("#edit_member_code").prop("hidden", true)
                this.setMemberCodes = [];
                this.id = null;
                this.usagePolicy = "ONCE_TIME_PER_DAY";
                this.usageScope = null;
                this.type = null;
                this.name = "";
                this.startTime = "";
                this.endTime = "";
                this.timeReuse = 0;
                this.shortDescription = "";
                this.longDescription = null;
                $(this.$refs['coupon_image'].$el).find("img").attr("src", "");
                this.$refs['coupon_image'].hasImage = false;
                $(this.$refs['barcode_image'].$el).find("img").attr("src", "");
                this.$refs['barcode_image'].hasImage = false;
                CKEDITOR.instances["long_description_input"].setData("");

                this.validName = true;
                this.validHasMemberCode = true;
                this.validNameLength = true;
                this.validStartTime = true;
                this.validEndTime = true;
                this.validTime = true;
                this.validTimeReuse = true;
                this.validTimeReuseValue = true;
                this.validImage = true;
                this.validShortDescription = true;
                this.validShortDescriptionLength = true;
                this.validBarCode = true;
            },
            showCouponForm: function (usageScope, type) {
                this.usageScope = usageScope;
                this.type = type;
                if (this.usageScope === "EVERYONE") {
                    this.textUsageScope = "全員";
                    $("#view_add_coupon").removeClass("col-md-8").addClass("col-md-12");
                    $("#edit_member_code").prop("hidden", true)
                } else if (this.usageScope === "MEMBER") {
                    this.textUsageScope = "会員限定";
                    $("#edit_member_code").prop("hidden", true)
                    $("#view_add_coupon").removeClass("col-md-8").addClass("col-md-12");
                } else {
                    this.textUsageScope = "会員指定";
                    $("#view_add_coupon").removeClass("col-md-12").addClass("col-md-8");
                    $("#edit_member_code").prop("hidden", false)
                }
                if (this.type === "1") {
                    this.textType = "あり";
                } else {
                    this.textType = "なし";
                }
            },
            function_validMemberCodeInput: function () {
                let text = $("#input_member_code_coupon").val();
                this.validMemberCodeInput = !(text === undefined || text.trim() === "" || text.length > 16);
            },
            function_validMemberCodeInputExist: function () {
                let text = $("#input_member_code_coupon").val();
                if (this.checkExistValueMemberCode(this.setMemberCodes, text)) {
                    this.validMemberCodeInputExist = false;
                } else {
                    this.validMemberCodeInputExist = true;
                }
            },
            function_validHasMemberCode: function(){
              if(this.usageScope === "MEMBER_DESIGNATION" && this.setMemberCodes.length === 0){
                  this.validHasMemberCode = false;
              }  else{
                  this.validHasMemberCode = true;
              }
            },
            checkExistValueMemberCode: function (array, code) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].memberCode == code) {
                        return true;
                    }
                }
                return false;
            },
            deleteAllMemberCoupon : function(){
              this.setMemberCodes = [];
            },
            addBlockMemberCode: function () {
                let text = $("#input_member_code_coupon").val();
                this.function_validMemberCodeInput();
                this.function_validMemberCodeInputExist();
                if (this.validMemberCodeInput == true && this.validMemberCodeInputExist) {
                    this.setMemberCodes.push({
                        memberCode: text
                    });
                    let element = document.getElementById("container-member-code");
                    element.scrollTop = element.scrollHeight;
                    $("#input_member_code_coupon").val("");
                } else {
                    return;
                }

            },
            updateForm: function (coupon) {
                this.setMemberCodes = coupon.setMemberCodes;
                this.id = coupon.id;
                this.usageScope = coupon.usageScope;
                // coupon.usageScope === "MEMBER" ? this.textUsageScope = "全員" : this.textUsageScope = '会員限定';
                if (this.usageScope === "EVERYONE") {
                    $("#view_add_coupon").removeClass("col-md-8").addClass("col-md-12");
                    $("#edit_member_code").prop("hidden", true)
                    this.textUsageScope = "全員";
                } else if (this.usageScope === "MEMBER") {
                    $("#edit_member_code").prop("hidden", true)
                    $("#view_add_coupon").removeClass("col-md-8").addClass("col-md-12");
                    this.textUsageScope = "会員限定";
                } else {
                    this.textUsageScope = "会員指定";
                    $("#view_add_coupon").addClass("col-md-8").removeClass("col-md-12");
                    $("#edit_member_code").prop("hidden", false)
                }
                this.type = coupon.type.toString(10);
                this.type === "1" ? this.textType = "あり" : this.textType = 'なし';
                this.name = coupon.name;
                $("#start_time").val(coupon.startTime);
                $("#end_time").val(coupon.endTime);
                this.timeReuse = coupon.timeReuse;
                this.usagePolicy = coupon.usagePolicy;
                this.shortDescription = coupon.shortDescription;
                this.longDescription = coupon.longDescription;
                $(this.$refs['coupon_image'].$el).find("img").attr("src", coupon.imageUrl);
                this.$refs['coupon_image'].hasImage = true;
                if (this.type === "1") {
                    $(this.$refs['barcode_image'].$el).find("img").attr("src", coupon.barCodeUrl);
                    this.$refs['barcode_image'].hasImage = true;
                }
                CKEDITOR.instances["long_description_input"].setData(coupon.longDescription);
            },
            validateImage: function () {
                this.validImage = this.$refs['coupon_image'].hasImage;
            },
            validateBarcodeImage: function () {
                if (this.type !== "1") {
                    this.validBarCode = true;
                } else {
                    this.validBarCode = this.$refs['barcode_image'].hasImage;
                }
            },
            validateName: function () {
                this.validName = this.name !== "";
                this.validNameLength = this.name.length <= 100;
            },
            validateStartTime: function () {
                this.validStartTime = !($("#start_time").val() === null || $("#start_time").val().trim() === "");
            },
            validateEndTime: function () {
                this.validEndTime = !($("#end_time").val() === null || $("#end_time").val().trim() === "");
            },
            validateTimeReuse: function () {
                if (this.usagePolicy !== "COUNTLESS_TIME") {
                    this.validTimeReuse = true;
                    this.validTimeReuseValue = true;
                } else {
                    this.validTimeReuse = this.timeReuse !== "";
                    this.validTimeReuseValue = this.timeReuse >= 0 && this.timeReuse <= 1000;
                }

            },
            validateTime: function () {
                let startTime = $("#start_time").val().replace("/", "");
                let endTime = $("#end_time").val().replace("/", "");
                this.validTime = startTime < endTime;
            },
            validateShortDescription: function () {
                this.validShortDescription = this.shortDescription !== "";
                this.validShortDescriptionLength = this.shortDescription.length <= 500;
            },
            validateForm: function () {
                this.validateName();
                this.function_validHasMemberCode();
                this.validateStartTime();
                this.validateEndTime();
                this.validateTime();
                this.validateTimeReuse();
                this.validateImage();
                this.validateShortDescription();
                this.validateBarcodeImage();
                return this.validName && this.validNameLength && this.validStartTime && this.validEndTime && this.validTime
                    && this.validTimeReuse && this.validTimeReuseValue && this.validHasMemberCode
                    && this.validImage && this.validShortDescription && this.validShortDescriptionLength && this.validBarCode;
            },
            addOrUdpateCoupon: function (e) {
                e.preventDefault();
                if (this.validateForm()) {
                    window.loader.show();
                    let formData = new FormData();
                    formData.append("couponImage", this.$refs['coupon_image'].getSelectedFile());
                    if (this.type === "1") {
                        formData.append("barCodeImage", this.$refs['barcode_image'].getSelectedFile());
                        console.log("Vao day");
                        console.log(this.$refs['barcode_image'].getSelectedFile());
                    }
                    if (this.id != null) {
                        formData.append("id", this.id);
                    }
                    formData.append("usageScope", this.usageScope);
                    formData.append("usagePolicy", this.usagePolicy);
                    formData.append("type", this.type);
                    formData.append("name", this.name);
                    formData.append("startTime", moment($("#start_time").val()).format(format));
                    formData.append("endTime", moment($("#end_time").val()).format(format));
                    if (this.usagePolicy === "COUNTLESS_TIME") {
                        formData.append("timeReuse", this.timeReuse);
                    }
                    formData.append("shortDescription", this.shortDescription);
                    formData.append("longDescription", CKEDITOR.instances["long_description_input"].getData());
                    if (this.setMemberCodes.length > 0) {
                        this.setMemberCodes.forEach(function (element) {
                            formData.append("setMemberCodes", element.memberCode);
                        })
                    }
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/coupon/addOrUpdateCoupon",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            switch (response.status.message) {
                                case "SUCCESS": {
                                    $('html,body').animate({
                                        scrollTop: 0
                                    }, 300);
                                    window.alert.show("success", "作成しました。", 1000);
                                    setTimeout(function () {
                                        location.reload();
                                    }, 1000);
                                    break;
                                }
                                case "ERROR": {
                                    self.$refs["loader"].hide();
                                    window.alert.show("error", response.data, 3000);
                                    $('#btn_submit_add').prop("disabled", false);
                                    break;
                                }
                            }
                        }
                    })
                }
            }
        },
        mounted: function () {
            let self = this;
            $("#btn_add_coupon").on('click', function () {
                self.resetForm();
            });
            configOneDate('start_time');
            configOneDate('end_time');
            initCKEditor('long_description_input');
            $(this.$el).find(".coupon-image .file-input").change(function () {
                self.validateImage();
            });
            $(this.$el).find(".barcode-image .file-input").change(function () {
                self.validateBarcodeImage();
            });
            $(".coupon-image .remove-image-icon").click(function () {
                self.$refs['coupon_image'].hasImage = false;
                self.validateImage();
            });
            $(".barcode-image .remove-image-icon").click(function () {
                self.$refs['barcode_image'].hasImage = false;
                self.validateBarcodeImage();
            });
        }
    });

    $(document).on('click', ".btn-delete-member-code-add", function () {
        let id = $(this).attr("id").replace("btn-delete-member-code-add", "");
        coupon.couponVue.setMemberCodes.splice(id, 1);
    })

    $("#btn_download_member_code_coupon").click(function () {
        let href = "/api/v1/web/" + appId + "/coupon/downloadTemplateCodeOneCoupon/" + "LIST_MEMBER_CODE_";
        window.open(href, "_blank");
    })
    $("#btn_import_member_code_coupon").click(function () {
        $("#file_member_code_modal_save").trigger('click');
    })

    $("#file_member_code_modal_save").change(function (e) {
        let fileExtension = ['csv'];
        e.preventDefault();
        if (this.files.length < 1) {
            return;
        } // alert if not valid
        if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            window.alert.show("error", "ファイル拡張が正しくないです。.csv をアップロードしてください。", 3000);
            return;
        }

        let formData = new FormData();
        formData.append("fileMemberOneCoupon", this.files[0]);
        window.loader.show();
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/coupon/ImportMemberCodeOneCoupon",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                window.loader.hide();
                if (response.status.code === 4) {
                    window.alert.show("error", response.status.message, "2000");
                    return;
                }
                let setMemberCodes = response.data;
                let listMemberCodeInputted = coupon.couponVue.setMemberCodes;
                for(let member of setMemberCodes){
                    if (coupon.couponVue.checkExistValueMemberCode(listMemberCodeInputted, member)) {
                        continue;
                    } else {
                        coupon.couponVue.setMemberCodes.push({
                            "memberCode": member
                        })
                    }
                }
            },
            error: function () {
                window.alert.show("error", "エラーが発生しました。しばらく待ってからもう一度お試してください。", "2000");
                window.loader.hide();
            }
        });
        $("#file_member_code_modal_save").val(null);
    })

});
function initCKEditor(element) {
    CKEDITOR.replace(element, {
        language: 'ja',
        height: 200,
        removePlugins: 'elementspath'
    })
    CKEDITOR.config.toolbar = [
        ['Styles', 'Format'],
        ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print'],
        ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Image', 'Table', '-', 'Link', 'Flash', 'Smiley', 'TextColor', 'BGColor', 'Source']
    ];
}
