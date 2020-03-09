$(document).ready(function () {
    var appId = $("#app_id").val();

    var image = new Vue({
        el: "#config_qr_image",
        data: {
            validSize : true,
            invalidSizeMessage : "invalidSizeMessage",
            hexDigits: new Array
            ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"),
        },
        methods: {
            validateSize : function(){
                var size_qr_image = $('#size_qr_image').val();
                if(size_qr_image === undefined || size_qr_image === '' || size_qr_image > 700 || size_qr_image <350){
                    this.validSize = false;
                }
                else{
                    this.validSize = true;
                }
                return this.validSize;
            },
            hex: function (x) {
                return isNaN(x) ? "00" : this.hexDigits[(x - x % 16) / 16] + this.hexDigits[x % 16];
            },
            rgb2hex: function (rgb) {
                rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
            },
            renderColor: function (data) {
                $('#text_color').ColorPicker({
                    color: data.textColor,
                    onShow: function (colpkr) {
                        $(colpkr).fadeIn(500);
                        return false;
                    },
                    onHide: function (colpkr) {
                        $(colpkr).fadeOut(500);
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        $('#text_color').css('backgroundColor', '#' + hex);
                    }
                });

                $('#background_color').ColorPicker({
                    color: data.backgroundColor,
                    onShow: function (colpkr) {
                        $(colpkr).fadeIn(500);
                        return false;
                    },
                    onHide: function (colpkr) {
                        $(colpkr).fadeOut(500);
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        $('#background_color').css('backgroundColor', '#' + hex);
                    }
                });
            },
            updateForm: function (data) {
                var self = this;
                if (data != null && data != '' && data.imageUrl != null && data.imageUrl != '') {
                    $(self.$refs['image_qr_code'].$el).find("img").attr("src", data.imageUrl);
                    self.$refs['image_qr_code'].hasImage = true;
                    self.hasImage = true;
                }
                $("#size_qr_image").val(data.size);
                $("#image_id").val(data.id);
                this.renderColor(data);
            },
            addQRConfig: function (e) {
                var self = this;
                e.preventDefault();
                if(this.validateSize()){
                    var fd = new FormData();
                    fd.append('id', $("#image_id").val());
                    fd.append('size', $("#size_qr_image").val());
                    fd.append('textColor', this.rgb2hex($("#text_color").css("backgroundColor")));
                    fd.append('backgroundColor', this.rgb2hex($("#background_color").css("backgroundColor")));
                    fd.append('image', self.$refs['image_qr_code'].getSelectedFile());
                    var params = {
                        "id": $("#image_id").val(),
                        "size": $("#size_qr_image").val(),
                        "textColor": this.rgb2hex($("#text_color").css("backgroundColor")),
                        "backgroundColor": this.rgb2hex($("#background_color").css("backgroundColor")),
                        "image": self.$refs['image_qr_code'].getSelectedFile()
                    };
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/web/" + appId + "/QRConfig/update",
                        data: fd,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        beforeSend: function () {
                            self.$refs["loader"].show();
                        },
                        success: function (response) {
                            if (response.status.code == 1000) {
                                self.updateForm(response.data);
                                window.alert.show("success", "成功", 3000);
                                self.$refs["loader"].hide();

                            }
                        }
                    })
                }

            }
        },
        mounted: function () {
            var self = this;
            $.ajax({
                type: "GET",
                url: "/api/v1/web/" + appId + "/QRConfig",
                success: function (response) {
                    var data = response.data;
                    if (data != null) {
                        self.updateForm(data);

                        $('#background_color').css('backgroundColor', data.backgroundColor);
                        $('#text_color').css('backgroundColor', data.textColor);
                    }
                    else{
                        self.renderColor({textColor: '#000', backgroundColor: '#fff'});
                        $('#background_color').css('backgroundColor', '#fff');
                        $('#text_color').css('backgroundColor',  '#000');
                    }

                }
            })

            $(".remove-image-icon").on('click', function () {
                self.hasImage = false;
            })
            $(self.$el).find(".file-input").change(function (e) {
                if (self.$refs['image_qr_code'].hasImage == true) {
                    self.hasImage = true;
                    self.validImage = true;
                } else {
                    self.validImage = false;
                }
            });
        }
    });


})