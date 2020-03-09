$(document).ready(function(){
    
	var appId = $("#app_id").val();

    var hexDigits = new Array
    ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");

    var color = [];
    //Function to convert rgb color to hex format
    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }

    jQuery.get("/api/v1/web/" + appId + "/system/color", function(response) {
        console.log(response)
        for (var i=0;i<response.length;i++) {
            color[i] = response[i];
        }

        $("#color1").css('backgroundColor',response[0].textColor);
        $("#color2").css('backgroundColor',response[0].borderColor);
        $("#color1").parent().parent().attr('id',response[0].id);
        $(".button-preview1").css('color',response[0].textColor);
        $(".button-preview1").attr('id',response[0].type);
        $(".button-preview1").css('backgroundColor',response[0].borderColor);

        //$('#color1').ColorPicker({color : response[0].textColor})

        $("#color3").css('backgroundColor',response[1].textColor);
        $("#color4").css('backgroundColor',response[1].borderColor);
        $("#color3").parent().parent().attr('id',response[1].id);
        $(".button-preview2").css('color',response[1].textColor);
        $(".button-preview2").css('border',"solid 0.5px "+response[1].borderColor);
        $(".button-preview2").attr('id',response[1].type);

        $("#color5").css('backgroundColor',response[2].textColor);
        $("#color6").css('backgroundColor',response[2].borderColor);
        $("#color5").parent().parent().attr('id',response[2].id);
        $(".preview_active").css('color',response[2].textColor);
        $(".preview_active").css('backgroundColor',response[2].borderColor);
        $(".preview_active").attr('id',response[2].type);

        $("#color7").css('backgroundColor',response[3].textColor);
        $("#color8").css('backgroundColor',response[3].borderColor);
        $("#color7").parent().parent().attr('id',response[3].id);
        $(".preview_unactive").css('color',response[3].textColor);
        $(".preview_unactive").css('border',"solid 0.5px "+response[3].borderColor);
        $(".preview_unactive").attr('id',response[3].type);

        $("#color9").css('backgroundColor',response[4].textColor);
        $("#color9").parent().parent().attr('id',response[4].id);
        $(".preview-text").css('color',response[4].textColor);
        $(".preview-text").attr('id',response[4].type);

        $("#color10").css('backgroundColor',response[5].textColor);
        $("#color10").parent().parent().attr('id',response[5].id);
        $(".preview_bg_color").attr('id',response[5].type);

        renderColor(response);
    })

    $(".update-color").on('click',function(){
        var listColor = [];
        var color1 ={
            id:$("#color1").parent().parent().attr('id'),
            type:$(".button-preview1").attr('id'),
            textColor: rgb2hex($(".button-preview1").css("color")),
            borderColor:rgb2hex($(".button-preview1").css("backgroundColor")),
            version:2
        }
        listColor.push(color1);
        var color2 ={
            id:$("#color3").parent().parent().attr('id'),
            type:$(".button-preview2").attr('id'),
            textColor: rgb2hex($(".button-preview2").css("color")),
            borderColor:rgb2hex($(".button-preview2").css("border-color")),
            version:2
        }
        listColor.push(color2);
        var color3 ={
            id:$("#color5").parent().parent().attr('id'),
            type:$(".preview_active").attr('id'),
            textColor: rgb2hex($(".preview_active").css("color")),
            borderColor:rgb2hex($(".preview_active").css("backgroundColor")),
            version:2
        }
        listColor.push(color3);
        var color4 ={
            id:$("#color7").parent().parent().attr('id'),
            type:$(".preview_unactive").attr('id'),
            textColor: rgb2hex($(".preview_unactive").css("color")),
            borderColor:rgb2hex($(".preview_unactive").css("border-color")),
            version:2
        }
        listColor.push(color4);
        var color5 ={
            id:$("#color9").parent().parent().attr('id'),
            type:$(".preview-text").attr('id'),
            textColor: rgb2hex($(".preview-text").css("color")),
            version:2
        }
        listColor.push(color5);
        var color6 ={
            id:$("#color10").parent().parent().attr('id'),
            type:$(".preview_bg_color").attr('id'),
            textColor: rgb2hex($("#color10").css("backgroundColor")),
            version:2
        }
        listColor.push(color6);
        var colorDto={
            colorEntities:listColor
        }
        console.log(colorDto)
        $(".update-color").prop("disabled",true);
        $.ajax({
            type: "POST",
            url: "/api/v1/web/"+appId+"/update/color",
            data: JSON.stringify(colorDto),
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                window.alert.show("success",$("#success").html(),2000);
                setTimeout(function(){
                    $(".update-color").prop("disabled",false);
                },2000)
            },
            error: function(response) {
                $(".message").removeClass("hidden");
                $(".message").addClass("alert-warning");
                $(".message").html(response.responseJSON.message);
            }
        })
    })

    function renderColor(response) {
        $('#color1').ColorPicker({
            color: response[0].textColor,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#color1').css('backgroundColor', '#' + hex);
                $(".button-preview1").css('color', '#' + hex);
            }
        });

        $('#color2').ColorPicker({
            color: response[0].borderColor,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#color2').css('backgroundColor', '#' + hex);
                $(".button-preview1").css('backgroundColor', '#' + hex);
            }
        });
        $('#color3').ColorPicker({
            color: response[1].textColor,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#color3').css('backgroundColor', '#' + hex);
                $(".button-preview2").css('color', '#' + hex);
            }
        });
        $('#color4').ColorPicker({
            color: response[1].borderColor,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                console.log("change")
                $('#color4').css('backgroundColor', '#' + hex);
                $(".button-preview2").css('border', 'solid 1px #'+hex);
            }
        });
        $('#color5').ColorPicker({
            color: response[2].textColor,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#color5').css('backgroundColor', '#' + hex);
                $(".preview_active").css('color', '#' + hex);
            }
        });
        $('#color6').ColorPicker({
            color: response[2].borderColor,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#color6').css('backgroundColor', '#' + hex);
                $(".preview_active").css('backgroundColor', '#' + hex);
            }
        });
        $('#color7').ColorPicker({
            color: response[3].textColor,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#color7').css('backgroundColor', '#' + hex);
                $(".preview_unactive").css('color', '#'+hex);
            }
        });
        $('#color8').ColorPicker({
            color: response[3].borderColor,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#color8').css('backgroundColor', '#' + hex);
                $(".preview_unactive").css('border', 'solid 1px #'+hex);
            }
        });

        $('#color9').ColorPicker({
            color: response[4].textColor,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#color9').css('backgroundColor', '#' + hex);
                $(".preview-text").css('color', '#'+hex);
            }
        });
        $('#color10').ColorPicker({
            color: response[5].textColor,
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#color10').css('backgroundColor', '#' + hex);
            }
        });
    }
})