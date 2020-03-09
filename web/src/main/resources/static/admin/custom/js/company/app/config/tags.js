$(document).ready(function () {
    var appId = $("#app_id").val();
    //setup taginput
    $(".coupon_tag_input").click(function () {
        $("#input_coupon_tag").focus();
    });
    $(".store_tag_input").click(function () {
        $("#input_store_tag").focus();
    });
    $(document).keypress(function (e) {
        if (e.which == 13) {
            var input = $("#input_coupon_tag").val();
            if (!input == "") {
                if (input.length >= 50) {
                    window.alert.show("error", "50文字以内で入力してください。", 1500);
                    return
                }
                if (validateCouponTag(input)) {
                    $('<span class="coupon-tag"><span>' + $("#input_coupon_tag").val() + '</span><i class="fa fa-remove delete-tag"></i></span>').insertBefore($("#input_coupon_tag"));
                    $("#input_coupon_tag").val('')
                } else {
                    window.alert.show("error", "このタグは既に存在します", 1500);
                }
            }
        }
    });
    $(document).keypress(function (e) {
        if (e.which == 13) {
            var input = $("#input_store_tag").val();
            if (!input == '') {
                if (input.length >= 50) {
                    window.alert.show("error", "同じタグが既に存在します。", 1500);
                    return
                }
                if (validateStoreTag(input)) {
                    $('<span class="store-tag"><span>' + $("#input_store_tag").val() + '</span><i class="fa fa-remove delete-tag"></i></span>').insertBefore($("#input_store_tag"));
                    $("#input_store_tag").val('')
                } else {
                    window.alert.show("error", "このタグは既に存在します。", 1500);
                }
            }
        }
    });
    $(document).on("click", ".delete-tag", function () {
        $(this).parent().remove();
    })
    var validateCouponTag = function (tag) {
        var boolean = true;
        $(".coupon-tag").each(function () {
            var text = $(this)[0].innerText;
            if (text === tag) {
                boolean = false;
            }
        })
        return boolean;
    }

    var validateStoreTag = function (tag) {
        var boolean = true;
        $(".store-tag").each(function (index) {
            var text = $(this)[0].innerText;
            if (text === tag) {
                boolean = false;
            }
        })
        return boolean;
    }
    jQuery.get("/api/v1/web/" + appId + "/tag/coupon_tag", function (response) {
        if (response != 0) {
            $.each(response, function (i) {
                $('<span class="coupon-tag" id="' + response[i].id + '"><span>' + response[i].name + '</span><i class="fa fa-remove delete-tag"></i></span>').insertBefore($("#input_coupon_tag"));
            });
        }
    })
    jQuery.get("/api/v1/web/" + appId + "/tag/store_tag", function (response) {
        if (response != 0) {
            $.each(response, function (i) {
                $('<span class="store-tag" id="' + response[i].id + '"><span>' + response[i].name + '</span><i class="fa fa-remove delete-tag"></i></span>').insertBefore($("#input_store_tag"));
            });
        }
    })
    $('#btn_submit_add').on('click', function () {
        var listCouponTag = [];
        var listStoreTag = [];
        $(".coupon-tag").each(function () {
            var couponTag = {
                id: $(this).attr('id'),
                name: $(this).children(":first").html(),
                type: "COUPON"
            }
            listCouponTag.push(couponTag)
        })

        $(".store-tag").each(function () {
            var storeTag = {
                id: $(this).attr('id'),
                name: $(this).children(":first").html(),
                type: "STORE"
            }
            listStoreTag.push(storeTag);
        })
        if (listCouponTag.length == 0 && listStoreTag.length == 0) {
            window.alert.show("error", "タグが空きにできません。", 1500);
            return;
        }
        var data = {
            couponTags: listCouponTag,
            storeTags: listStoreTag
        }
        $("#btn_submit_add").prop("disabled", true);
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/tag/update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (response) {
                switch (response.status.message) {
                    case "SUCCESS": {
                        window.alert.show("success", $("#success").html(), 2000);
                        setTimeout(function () {
                            $("#btn_submit_add").prop("disabled", false);
                            location.reload();
                        }, 2000)

                        break;
                    }

                    case "ERROR": {
                        $(".message").removeClass("hidden");
                        $(".message").addClass("alert-warning");

                        $(".message").html(response.status.message);
                        break;
                    }
                }
            }
        })

    })

});
	