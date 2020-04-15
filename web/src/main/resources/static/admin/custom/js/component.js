var fileSize3MB = 3145728;
var fileSize5MB = 5242880;
var fileSize30MB = 31457280;

function initCKEditor(element) {
    CKEDITOR.replace(element, {
        language: 'ja',
        height: 200,
        removePlugins: 'elementspath'
    })
    CKEDITOR.config.toolbar = [
        ['Styles', 'Format'],
        ['Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print'],
        ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Image', 'Table', '-', 'Link', 'Flash', 'Smiley', 'TextColor', 'BGColor', 'Source']
    ];
}

$(document).ready(function () {

    $(document).on('focus', '.form-control', function () {
        $(this).attr('autocomplete', 'off');
    });

    $("#hidden_menu").hide();

    $(".control-menu").click(function () {
        $("#hidden_menu").toggle();
    });

    $(document).mouseup(function (e) {
        var container = $(".control-menu");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $("#hidden_menu").hide();
        }
    });

    window.alert = {
        show: function (type, message, interval) {
            if (type === "error") {
                console.log('error')
                $("#alert").removeClass("alert-success");
                $("#alert").addClass("alert-danger");
                $("#alert .error-icon").removeClass("hidden");
                $("#alert .success-icon").addClass("hidden");
            } else if (type === "success") {
                console.log('success')
                $("#alert").removeClass("alert-danger");
                $("#alert").addClass("alert-success");
                $("#alert .error-icon").addClass("hidden");
                $("#alert .success-icon").removeClass("hidden");
            }
            $("#alert").removeClass("hidden");
            $("#alert_message").html(message);
            $("#alert").animate({
                top: "50px"
            }, "slow");

            setTimeout(function () {
                $("#alert").animate({
                    top: "-200px"
                }, "slow");
            }, interval);
        }
    };


    window.loader = {
        show: function () {
            $("#loader").removeClass("hidden");
        },
        hide: function () {
            $("#loader").addClass("hidden");
        }

    }

    window.ProgressBar = function () {
        this.currentWidth = 1;
        this.show = function () {
            $("#progress_bar_container").removeClass("hidden");
            document.getElementById("progress_status").style.width = "2" + '%';
        },
            this.increaseProgress = function (toWidth) {
                var element = document.getElementById("progress_status");
                var id = setInterval(frame, 10);
                var self = this;

                function frame() {
                    if (self.currentWidth >= toWidth || self.currentWidth >= 100) {
                        clearInterval(id);
                    } else {
                        self.currentWidth++;
                        element.style.width = self.currentWidth + '%';
                    }
                }
            },
            this.hide = function () {
                $("#progress_bar_container").addClass("hidden");
            }
    };

});
