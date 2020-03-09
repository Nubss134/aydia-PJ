$(document).ready(function () {

    var appId = $("#app_id").val();

    var update_certificate = new Vue({

        el: "#upload_image",
        data: {},
        mounted: function () {
            var self = this;
            jQuery.get("/api/v1/web/" + appId + "/app/detail", function (response) {

                if (response != null && response != '' && response.certificateImage != null && response.certificateImage != '') {
                    var certificateImage = response.certificateImage;
                    $(self.$refs['certificate-uploader'].$el).find("img").attr("src", certificateImage)
                    self.$refs['certificate-uploader'].hasImage = true

                }
            });
            $(this.$el).find(".file-input").change(function (e) {
                if (this.files.length === 0) {
                    $("#btn_submit_add").prop("disabled", true)
                } else if (this.files[0].size > fileSize3MB) {
                    $("#btn_submit_add").prop("disabled", true)
                } else {
                    if (self.validateImageFile(this.files[0])) {
                        $("#btn_submit_add").prop("disabled", false)
                    } else {
                        $("#btn_submit_add").prop("disabled", true)

                    }
                }
            })
        },

        methods: {
            validateImageFile: function (file) {
                var validImageTypes = ["image/jpeg", "image/png"];

                if (validImageTypes.indexOf(file.type) > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            updateCertificateImage: function (e) {

                var formData = new FormData();
                var self = this;

                var image_uploader = self.$refs['certificate-uploader'];
                var $img = $(image_uploader.$el).find("img");

                console.log(image_uploader);

                if (image_uploader.hasFile || image_uploader.hasImage) {
                    if (image_uploader.getSelectedFile().size > fileSize3MB) {
                        window.alert.show("error", "ファイルの最大サイズは３MBです。", 3000);
                        return;
                    }
                    formData.append("imageAttachment", image_uploader.getSelectedFile());
                } else {
                    window.alert.show("error", "会員証画像が必須項目です。", 3000);
                    return;
                }

                $.ajax({
                    type: "POST",
                    url: "/api/v1/web/" + appId + "/app/updateCertificate",
                    data: formData,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    beforeSend: function () {
                        $("#btn_submit_add").attr('disabled', true);
                        self.$refs["loader"].show();
                    },
                    success: function (response) {
                        console.log(response.status.message)
                        console.log(response.status.message == 'ERROR')
                        switch (response.status.message) {
                            case "SUCCESS": {
                                $('html,body').animate({
                                    scrollTop: 0
                                }, 300);

                                window.alert.show("success", "会員証画像を更新しました。", 3000);

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
    })

})