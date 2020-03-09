$(document).ready(function () {
    let appId = $("#app_id").val();
    $.get("/api/v1/web/" + appId + "/text/myPage/detail", function (response) {
        CKEDITOR.instances["content"].setData(response.value);
    });
    CKEDITOR.editorConfig = function (config) {
        config.language = 'ja';
        config.uiColor = '#F5F5F5';
        config.toolbarCanCollapse = true;
    };
    CKEDITOR.config.height = "350px";
    CKEDITOR.config.language = "ja";
    CKEDITOR.config.removePlugins = "elementspath";
    CKEDITOR.config.toolbar = [['Styles', 'Format', 'Font', 'FontSize'],
        ['Bold', 'Italic','Link', 'Underline', 'StrikeThrough', '-', 'Undo', 'Redo', '-', 'Cut', 'Copy', 'Paste', 'Find', 'Replace', '-', 'Outdent', 'Indent', '-', 'Print'],
        ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Image', 'Table', '-', 'Link', 'Flash', 'Smiley', 'TextColor', 'BGColor', 'Source']];
    $(".update-text-my-page").on('click', function () {
        $(".update-text-my-page").prop("disabled", true);
        let content = CKEDITOR.instances['content'].getData();
        if (content === '') {
            $("#required_content").removeClass("hidden");
            setTimeout(function () {
                $(".update-term").prop(
                    "disabled", false);
            }, 2000)
        } else {
            $("#required_content").addClass("hidden");
            let formData = new FormData();
            formData.append("content", content);
            $.ajax({
                type: "POST",
                url: "/api/v1/web/" + appId + "/text/myPage/update",
                data: formData,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (response) {
                    switch (response.status.message) {
                        case "SUCCESS": {
                            window.alert.show("success", $("#success").html(), "2000");
                            setTimeout(function () {
                                $(".update-term").prop("disabled", false);
                            }, 2000);
                            break;
                        }
                    }
                }
            })
        }
    })

});