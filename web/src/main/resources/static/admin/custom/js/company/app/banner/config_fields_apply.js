$(document).ready(function () {
	var appId = $("#app_id").val();
	var bannerId;
	var configFieldsApplyId;
	
	$(document).on("click", ".btn-download", function() {
		bannerId = $(this).attr("id").replace("btn_download_","");
		var href = "/api/v1/web/" + appId + "/bannerImage/exportUserApplyBanner/" + bannerId
		window.location.href = href;
    });	
	
	$(document).on("click", ".btn-config", function() {
		bannerId = $(this).attr("id").replace("btn_config_","")
		jQuery.get("/api/v1/web/" + appId + "/bannerImage/getConfigFieldsApply/" + bannerId, function (response) {
        		configFieldsApplyId = response.id
        		$("#link_terms_of_use").val(response.linkTermsOfUse);
        		$('#has_name').prop("checked", response.hasName);
        		$('#has_gender').prop("checked", response.hasGender);
        		$('#has_birthday').prop("checked", response.hasBirthday);
        		$('#has_zipcode').prop("checked", response.hasZipCode);
        		$('#has_city').prop("checked", response.hasCity);
        		$('#has_district').prop("checked", response.hasDistrict);
        		$('#has_home_address').prop("checked", response.hasHomeAddress);
        		$('#has_phone_number').prop("checked", response.hasPhoneNumber);
        		$('#has_email').prop("checked", response.hasEmail);
        		$('#has_confirm_email').prop("checked", response.hasConfirmEmail);
        		$('#has_terms_of_use').prop("checked", response.hasTermsOfUse);
        		
        		$('#required_name').prop("checked", response.requiredName);
        		$('#required_gender').prop("checked", response.requiredGender);
        		$('#required_birthday').prop("checked", response.requiredBirthday);
        		$('#required_zipcode').prop("checked", response.requiredZipCode);
        		$('#required_city').prop("checked", response.requiredCity);
        		$('#required_district').prop("checked", response.requiredDistrict);
        		$('#required_home_address').prop("checked", response.requiredHomeAddress);
        		$('#required_phone_number').prop("checked", response.requiredPhoneNumber);
        		$('#required_email').prop("checked", response.requiredEmail);
        		$('#required_confirm_email').prop("checked", response.requiredConfirmEmail);
        		$('#required_terms_of_use').prop("checked", response.requiredTermsOfUse);
        });
	})
	
    var validateLinkTermsOfUse = function() {
    	if ($('#has_terms_of_use').is(':checked')) {
            if ($("#link_terms_of_use").val() == null || $("#link_terms_of_use").val() == "") {
            	$("#required_link_terms_of_use").removeClass("hidden");
            	return false;
            } else {
            	return true;
            }
        } else {
        	return true;
        }
    }

    $(document).on("click", "#btn_submit_config_fields_apply", function() {
        if(validateLinkTermsOfUse()) {
        	$("#btn_submit_config_fields_apply").prop("disabled", true);
            var configFieldsApply = {
                id: configFieldsApplyId,
                bannerId: bannerId,
                appId : appId,
                linkTermsOfUse : $("#link_terms_of_use").val(),
                hasName: $('#has_name').is(':checked') ? 'true' : 'false',
                hasGender: $('#has_gender').is(':checked') ? 'true' : 'false',
                hasBirthday: $('#has_birthday').is(':checked') ? 'true' : 'false',	
                hasZipCode: $('#has_zipcode').is(':checked') ? 'true' : 'false',
                hasCity: $('#has_city').is(':checked') ? 'true' : 'false',	
                hasDistrict: $('#has_district').is(':checked') ? 'true' : 'false',
                hasHomeAddress: $('#has_home_address').is(':checked') ? 'true' : 'false',
                hasPhoneNumber: $('#has_phone_number').is(':checked') ? 'true' : 'false',
                hasEmail: $('#has_email').is(':checked') ? 'true' : 'false',
                hasConfirmEmail: $('#has_confirm_email').is(':checked') ? 'true' : 'false',
                hasTermsOfUse: $('#has_terms_of_use').is(':checked') ? 'true' : 'false',
                		
                requiredName: $('#required_name').is(':checked') ? 'true' : 'false',
                requiredGender: $('#required_gender').is(':checked') ? 'true' : 'false',
                requiredBirthday: $('#required_birthday').is(':checked') ? 'true' : 'false',	
                requiredZipCode: $('#required_zipcode').is(':checked') ? 'true' : 'false',
                requiredCity: $('#required_city').is(':checked') ? 'true' : 'false',	
                requiredDistrict: $('#required_district').is(':checked') ? 'true' : 'false',
                requiredHomeAddress: $('#required_home_address').is(':checked') ? 'true' : 'false',
                requiredPhoneNumber: $('#required_phone_number').is(':checked') ? 'true' : 'false',
                requiredEmail: $('#required_email').is(':checked') ? 'true' : 'false',
                requiredConfirmEmail: $('#required_confirm_email').is(':checked') ? 'true' : 'false',
                requiredTermsOfUse: $('#required_terms_of_use').is(':checked') ? 'true' : 'false',
            }
            $.ajax({
                type: "POST",
                url: "/api/v1/web/" + appId + "/bannerImage/configFieldsApply",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(configFieldsApply),
                success: function (response) {
                    console.log(response);
                    switch (response.status.code) {
                        case 1000: {
                            window.alert.show("success", $("#success").html(), "2000");
                            setTimeout(function () {
                                $("#btn_submit_config_fields_apply").prop("disabled", false);
                                $("#modal_config_fields_apply").modal("toggle")
                            }, 2000)
                            break;
                        }
                    }
                }

            })
        }
    });
    
    $('#has_name').on('click', function () {
        if (!$('#has_name').is(':checked')) {
            $('#required_name').prop("checked", false);
        }
    });
    $('#required_name').on('click', function () {
        if ($('#required_name').is(':checked')) {
            $('#has_name').prop("checked", true);
        }
    });
    
    $('#has_gender').on('click', function () {
        if (!$('#has_gender').is(':checked')) {
            $('#required_gender').prop("checked", false);
        }
    });
    $('#required_gender').on('click', function () {
        if ($('#required_gender').is(':checked')) {
            $('#has_gender').prop("checked", true);
        }
    });

    $('#has_birthday').on('click', function () {
        if (!$('#has_birthday').is(':checked')) {
            $('#required_birthday').prop("checked", false);
        }
    });
    $('#required_birthday').on('click', function () {
        if ($('#required_birthday').is(':checked')) {
            $('#has_birthday').prop("checked", true);
        }
    });
    
    $('#has_zipcode').on('click', function () {
        if (!$('#has_zipcode').is(':checked')) {
            $('#required_zipcode').prop("checked", false);
        }
    });
    $('#required_zipcode').on('click', function () {
        if ($('#required_zipcode').is(':checked')) {
            $('#has_zipcode').prop("checked", true);
        }
    });
    
    $('#has_city').on('click', function () {
        if (!$('#has_city').is(':checked')) {
            $('#required_city').prop("checked", false);
        }
    });
    $('#required_city').on('click', function () {
        if ($('#required_city').is(':checked')) {
            $('#has_city').prop("checked", true);
        }
    });
    
    $('#has_district').on('click', function () {
        if (!$('#has_district').is(':checked')) {
            $('#required_district').prop("checked", false);
        }
    });
    $('#required_district').on('click', function () {
        if ($('#required_district').is(':checked')) {
            $('#has_district').prop("checked", true);
        }
    });
    
    $('#has_home_address').on('click', function () {
        if (!$('#has_home_address').is(':checked')) {
            $('#required_home_address').prop("checked", false);
        }
    });
    $('#required_home_address').on('click', function () {
        if ($('#required_home_address').is(':checked')) {
            $('#has_home_address').prop("checked", true);
        }
    });
    
    $('#has_phone_number').on('click', function () {
        if (!$('#has_phone_number').is(':checked')) {
            $('#required_phone_number').prop("checked", false);
        }
    });
    $('#required_phone_number').on('click', function () {
        if ($('#required_phone_number').is(':checked')) {
            $('#has_phone_number').prop("checked", true);
        }
    });
    
    $('#has_email').on('click', function () {
        if (!$('#has_email').is(':checked')) {
            $('#required_email').prop("checked", false);
        }
    });
    $('#required_email').on('click', function () {
        if ($('#required_email').is(':checked')) {
            $('#has_email').prop("checked", true);
        }
    });
    
    $('#has_confirm_email').on('click', function () {
        if (!$('#has_confirm_email').is(':checked')) {
            $('#required_confirm_email').prop("checked", false);
        }
    });
    $('#required_confirm_email').on('click', function () {
        if ($('#required_confirm_email').is(':checked')) {
            $('#has_confirm_email').prop("checked", true);
        }
    });
    
    $('#has_terms_of_use').on('click', function () {
        if (!$('#has_terms_of_use').is(':checked')) {
            $('#required_terms_of_use').prop("checked", false);
        }
    });
    $('#required_terms_of_use').on('click', function () {
        if ($('#required_terms_of_use').is(':checked')) {
            $('#has_terms_of_use').prop("checked", true);
        }
    });
    
    $("#link_terms_of_use").keyup(function() {
    	$("#required_link_terms_of_use").addClass("hidden")
    })

});