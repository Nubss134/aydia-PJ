$(document).ready(function () {

    var appId = $("#app_id").val();
    var form_add_image = new Vue({
        el: "#upload_images",
        data: {},
        mounted: function () {
            var self = this;
            jQuery.get("/api/v1/web/" + appId + "/introducingImage/list", function (response) {
                console.log(response)
                $.each(response, function (index, value) {
                    var i = index + 1;
                    $(self.$refs['image-uploader' + i].$el).find("img").attr("src", value.urlUpdated)
                    $(self.$refs['image-uploader' + i].$el).find("img").attr("id", 'introducing_image_' + value.id)
                    self.$refs['image-uploader' + i].hasImage = true;
                })
            });
        },
        methods: {
            addIntroducingImage: function (e) {

                var formData = new FormData();
                var self = this;
                var check = false;
                for (var i = 1; i < 5; i++) {

                    var image_uploader = self.$refs["image-uploader" + i];
                    var $img = $(image_uploader.$el).find("img");
                    if (image_uploader.hasFile || image_uploader.hasImage) {
                        // Div này đã có hình ảnh
                        if (($img.attr("src").includes("data:image") && $img.attr("id") !== undefined)) {
                            // Thay thế hình có sẵn bằng hình khác : Hình mới được chọn từ local và có id
                            formData.append("ids", $(image_uploader.$el).find("img").attr("id").replace('introducing_image_', ''));
                            formData.append("imageAttachments", image_uploader.getSelectedFile());
                        } else if ($img.attr("src").includes("data:image") && $img.attr("id") === undefined) {
                            // Thêm một hình mới
                            formData.append("ids", 0);
                            formData.append("imageAttachments", image_uploader.getSelectedFile());
                        }
                        check = true;
                    } else if ($img.attr("id") !== undefined) {
                        // Trường hợp xóa 1 hình đã tồn tại
                        formData.append("deleteIds", $img.attr("id").replace('introducing_image_', ''));
                    }
                }
                if (!check) {
                    window.alert.show("error", "オープニングアプリ説明イメージ像が必須項目です。", 3000);
                    return;
                }

                formData.append("alwaysDisplay", $('input[name=introducing_display_type]:checked').val());
                console.log($('input[name=introducing_display_type]:checked').val());

                $.ajax({
                    type: "POST",
                    url: "/api/v1/web/" + appId + "/introducingImage/add",
                    data: formData,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    beforeSend: function () {
                        $("#btn_submit_add").attr('disabled', true);
                        self.$refs["loader"].show();
                    },
                    success: function (response) {
                        switch (response.status.message) {
                            case "SUCCESS": {
                                $('html,body').animate({
                                    scrollTop: 0
                                }, 300);
                                window.alert.show("success", "オープニングアプリ説明イメージ を更新しました。", 3000);

                                setTimeout(function () {
                                    location.reload();
                                }, 1000);

                                break;
                            }
                            case "ERROR": {
                                self.$refs["loader"].hide();
                                window.alert.show("success", response.data, 3000);
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