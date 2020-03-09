$(document).ready(function () {
    if($("#is_system_admin").val() == 'false'){
        $(".checkbox-container input[type='checkbox']").attr('disabled',true);
        $(".checkbox-container span").addClass('disabled');
    }


    $('#hasZipcode').on('click', function () {
        if (!$('#hasZipcode').is(':checked')) {
            $('#requiredZipcode').prop("checked", false);
        }
    });
    $('#requiredZipcode').on('click', function () {
        if ($('#requiredZipcode').is(':checked')) {
            $('#hasZipcode').prop("checked", true);
        }
    });

    $('#hasBirthday').on('click', function () {
        if (!$('#hasBirthday').is(':checked')) {
            $('#requiredBirthday').prop("checked", false);
        }
    });
    $('#requiredBirthday').on('click', function () {
        if ($('#requiredBirthday').is(':checked')) {
            $('#hasBirthday').prop("checked", true);
        }
    });

    $('#hasGender').on('click', function () {
        if (!$('#hasGender').is(':checked')) {
            $('#requiredGender').prop("checked", false);
        }
    });
    $('#requiredGender').on('click', function () {
        if ($('#requiredGender').is(':checked')) {
            $('#hasGender').prop("checked", true);
        }
    });

    $('#hasJob').on('click', function () {
        if (!$('#hasJob').is(':checked')) {
            $('#requiredJob').prop("checked", false);
        }
    });
    $('#requiredJob').on('click', function () {
        if ($('#requiredJob').is(':checked')) {
            $('#hasJob').prop("checked", true);
        }
    });

    $('#hasLive').on('click', function () {
        if (!$('#hasLive').is(':checked')) {
            $('#requiredLive').prop("checked", false);
        }
    });
    $('#requiredLive').on('click', function () {
        if ($('#requiredLive').is(':checked')) {
            $('#hasLive').prop("checked", true);
        }
    });

    var appId = $("#app_id").val();
    $(".update-register-config").on('click', function () {
        $(".update-register-config").prop("disabled", true);
        var configRegister = {
            id: $("#config_id").val(),
            hasZipcode: $('#hasZipcode').is(':checked') ? 'true' :
                'false',
            hasBirthday: $('#hasBirthday').is(':checked') ? 'true' :
                'false',
            hasGender: $('#hasGender').is(':checked') ? 'true' :
                'false',
            hasJob: $('#hasJob').is(':checked') ? 'true' : 'false',
            hasLive: $('#hasLive').is(':checked') ? 'true' :
                'false',
            requiredZipcode: $('#requiredZipcode').is(':checked') ? 'true' :
                'false',
            requiredBirthday: $('#requiredBirthday').is(':checked') ? 'true' : 'false',
            requiredGender: $('#requiredGender').is(':checked') ? 'true' :
                'false',
            requiredJob: $('#requiredJob').is(':checked') ? 'true' :
                'false',
            requiredLive: $('#requiredLive').is(':checked') ? 'true' :
                'false',

        }
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/update/configRegister",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(configRegister),
            success: function (response) {
                console.log(response);
                switch (response.status.code) {
                    case 1000: {
                        window.alert.show("success", $("#success").html(), "2000");
                        setTimeout(function () {
                            $(".update-register-config").prop("disabled", false);
                        }, 2000)
                        break;
                    }
                }
            }

        })
    })

});