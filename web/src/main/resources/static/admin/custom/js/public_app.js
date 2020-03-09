$(document).ready(function () {
        var appId = $("#app_id").val();
        $("#public_app").on('click', function () {
                $.post("/api/v1/web/" + appId + "/app/getStatus", function (response) {
                    var i = 2;
                    for (var valueName in response) {
                        if (response[valueName] === 3) {
                            $(".modal-body div:nth-child(" + i + ") .update .update-icon").remove();
                            $(".modal-body div:nth-child(" + i + ") .update").append('<i class="fa fa-check-circle update-icon"></i>');
                            $(".modal-body div:nth-child(" + i + ") .valid-status-app .success-icon").remove();
                            $(".modal-body div:nth-child(" + i + ") .valid-status-app .fail-icon").remove();
                            $(".modal-body div:nth-child(" + i + ") .valid-status-app").append('<i class="fa fa-check-circle success-icon" ></i>');
                        } else if (response[valueName] === 2) {
                            $(".modal-body div:nth-child(" + i + ") .valid-status-app .success-icon").remove();
                            $(".modal-body div:nth-child(" + i + ") .valid-status-app .fail-icon").remove();
                            $(".modal-body div:nth-child(" + i + ") .valid-status-app").append('<i class="fa fa-check-circle success-icon"></i>');
                        } else {
                            $(".modal-body div:nth-child(" + i + ") .valid-status-app .fail-icon").remove();
                            $(".modal-body div:nth-child(" + i + ") .valid-status-app .success-icon").remove();
                            $(".modal-body div:nth-child(" + i + ") .valid-status-app").append('<i class="fa fa-times-circle fail-icon"></i>');
                        }
                        i++;
                    }
                    if ($(".fail-icon").length == 0) {
                        $("#confirm_public").prop('disabled', false);
                    } else {
                        $("#confirm_public").prop('disabled', true);
                    }
                });
            })

        $(document).on('click', '#confirm_public', function () {
            $("#confirm_public").prop("disabled", true)
            $.post("/api/v1/web/" + appId + "/app/public", function () {
                window.alert.show("success", $("#success").html(), "1200");
                setTimeout(function () {
                    location.reload()
                }, 1200);
            })
        })
    });