$(document).ready(function () {

    var companyId = $("#company_id").val();


    jQuery.validator.addMethod("hasCharacter", function (password) {
        var length = password.length;
        ch = '';
        while (length--) {
            ch = password.charAt(length);
            if (ch <= '0' || ch >= '9') {
                return true; // we have found a character here
            }
        }
        return false; // the loop is done, yet we didn't find any character
    });

    jQuery.validator.addMethod("phone", function (phone) {
        if (/^(?:\d{10}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/.test(phone)) {
            return true
        }
        return false; // the loop is done, yet we didn't find any character
    });

    jQuery.validator.addMethod("notEqual", function (value, element, options) {
        // get all the elements passed here with the same class
        var elems = $(".not-same");
        // the value of the current element
        var valueToCompare = value;
        // count
        var matchesFound = 0;
        // loop each element and compare its value with the current value
        // and increase the count every time we find one
        jQuery.each(elems, function () {
            thisVal = $(this).val();
            if (thisVal == valueToCompare) {
                matchesFound++;
            }
        });
        // count should be either 0 or 1 max
        if (this.optional(element) || matchesFound <= 1) {
            //elems.removeClass('error');
            return true;
        } else {
            //elems.addClass('error');
        }
    })

    jQuery.validator.addMethod("hasDigist", function (password) {
        var length = password.length;
        ch = '';
        while (length--) {
            ch = password.charAt(length);
            if (ch >= 0 || ch <= 9) {
                return true; // we have found a digist here
            }
        }
        return false; // the loop is done, yet we didn't find any character
    });
    $("#form_company_info").validate({
        errorElement: 'p',
        lang: 'ja',
        errorClass: 'error-message',
        focusInvalid: false,
        ignore: "",
        rules: {
        	company_first_name: {
                required: true,
                maxlength: 100
            },
            company_last_name: {
                required: true,
                maxlength: 100
            },
            company_phone: {
                required: true,
                maxlength: 30
            },          
            company_address: {
                required: true,
                maxlength: 500
            },
            company_suite: {
                required: false,
                maxlength: 500
            },
            company_city: {
                required: true,
                maxlength: 100
            },
            company_state: {
                required: true,
                maxlength: 100
            },
            company_postal_code: {
                required: true,
                maxlength: 100
            },
            company_email: {
                required: true,
                maxlength: 100
            },
        },
        messages: {
            company_phone: {
                phone: "電話番号が無効です"
            }
        },
        errorPlacement: function (error, element) {
            $(element).before(error);
        },
        highlight: function (element) {
            $(element).addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).removeClass("has-error");
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            var company = {
                id: $("#company_id").val(),
                name: $("#company_name").val(),
                firstName: $("#company_first_name").val(),
                lastName: $("#company_last_name").val(),
                address: $("#company_address").val(),
                suite: $("#company_suite").val(),
                city: $("#company_city").val(),
                state: $("#company_state").val(),
                postalCode: $("#company_postal_code").val(),
                phoneNumber: $("#company_phone").val(),
                email: $("#company_email").val(),
            }
            $("#btn_submit_company_info").prop("disabled", true);
            $.ajax({
                type: "POST",
                url: "/api/v1/web/company/" + companyId + "/updateCompany",
                data: JSON.stringify(company),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    console.log(response)
                    window.alert.show("success", "変更しました。", "2000");
                    setTimeout(function () {
                        $("#btn_submit_company_info").prop("disabled", false);
                    }, 2000);

                }
            })
        }
    });
})