$(document).ready(function () {

    var appId = $("#app_id").val();

    var form_add_logo = new Vue({
        el: "#upload_logo",
        data: {},
        mounted: function () {
            var self = this;
            jQuery.get("/api/v1/app/" + appId + "/app/detail", function (response) {
                if (response != null && response != '' && response.logoUrlUpdated != null && response.logoUrlUpdated != '') {
                    $(self.$refs['logo_uploader'].$el).find("img").attr("src", response.logoUrlUpdated)
                    self.$refs['logo_uploader'].hasImage = true
                }
            })
            $("#upload_logo .remove-image-icon").click(function (e) {
                $("#btn_submit_update_logo").attr('disabled', 'disabled');
                $(self.$refs['logo_uploader'].$el).find("img").attr("src", null)
                $(self.$refs['logo_uploader'].$el).find("img").attr("title", null)
            });
        },
        methods: {
            updateLogo: function () {
                var formData = new FormData();
                var self = this;
                var file_uploader1 = self.$refs["logo_uploader"];
                if (file_uploader1.hasFile || file_uploader1.hasImage) {
                    formData.append("fileAttachment", file_uploader1.getSelectedFile());
                }
                formData.append("appId", appId);
                $.ajax({
                    type: "POST",
                    url: "/api/v1/web/" + appId + "/app/updateLogo",
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
                                $(".message-logo").html("Logo updated successfully");
                                $(".message-logo").removeClass("hidden");
                                $(".message-logo").removeClass("alert-danger");
                                $(".message-logo").addClass("alert-success");

                                setTimeout(function () {
                                    $(".message-logo").hide();
                                    location.reload();
                                }, 1000);
                                break;
                            }
                            case "ERROR": {
                                self.$refs["loader"].hide();
                                self.$refs["require_create_app"].show();
                                break;
                            }
                        }
                    }
                })

            }
        }
    })
})