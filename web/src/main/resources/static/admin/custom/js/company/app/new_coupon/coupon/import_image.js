$(document).ready(function () {

    let appId = $("#app_id").val();

    let tableImageNormal;
    let $importImageNormalButton = $("#import_image_btn");
    let $importImageNormalInput = $("#import_image_input");

    let listFileImport = [];
    $importImageNormalButton.click(function () {
        $importImageNormalInput.click();
    });

    $importImageNormalInput.on('change', function (e) {
        let fileExtension = ['png', 'jpeg', 'jpg','jpg'];
        e.preventDefault();
        let listFile = this.files;
        let filesAmount = listFile.length;
        if (filesAmount < 1) {
            return;
        }

        if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) === -1) {
            window.alert.show("error", "画像またはPDFファイルを選択してください。", 2000);
            return;
        }
        if (tableImageNormal != null) {
            tableImageNormal.destroy();
        }

        renderPreviewImageTable(this, convertToDatatable, listFileImport);

        $(this).val(null);
    });

    function renderPreviewImageTable(input, callback, listToSend) {
        $('#table_image_normal_coupon_import tbody tr').remove();
        let listFile = input.files;
        let filesAmount = listFile.length;
        for (let i = 0; i < filesAmount; i++) {
            listToSend.push(listFile[i]);
            renderImage(listFile[i], callback);
        }

        function renderImage(image, callback) {
            let table = $('#table_image_normal_coupon_import tbody');
            let reader = new FileReader();
            reader.onload = function (e) {
                let html = '<tr><td><img class="image-import-render" alt="' + image.name + '" src="' + e.target.result + '" /></td>' +
                    '<td class="image-import-name">' + image.name + '</td>' +
                    '<td>' +
                    '<button class="btn btn-hover btn-danger btn-sm btn-delete-image-normal-coupon">削除</button>' +
                    '</td></tr>';
                table.append(html);
                if (!--filesAmount) {
                    callback();
                }
            };
            reader.readAsDataURL(image);
        }
    }

    function convertToDatatable() {
        $("#modal_image_normal_coupon_import").modal("show");
        tableImageNormal = $('#table_image_normal_coupon_import').DataTable({
            "language": {
                "url": "/libs/new_data_table/js/ja.json"
            },
            "lengthMenu": [
                [10, 20, 50],
                [10, 20, 50]
            ],
            "ordering": false,
            "searching": false,
        });
    }

    $(document).on("click", ".btn-delete-image-normal-coupon", function () {
        tableImageNormal.row($(this).parents("tr")).remove().draw();
        let fileRemoveName = ($(this).parents('tr').find(".image-import-name").text());
        let index = listFileImport.findIndex(file => file.name === fileRemoveName);
        if (index !== -1) {
            listFileImport.splice(index, 1);
        }
    });

    $(document).on("click", "#btn_submit_import_image_normal_coupon", function () {
        let formData = new FormData();
        for (let i = 0; i < listFileImport.length; i++) {
            formData.append("listImageImport", listFileImport[i]);
        }
        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/newCoupon/importImage",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                window.loader.show();
            },
            success: function (response) {
                $("#modal_image_normal_coupon_import").modal("hide");
                window.loader.hide();
                let code = response.status.code;
                if (code === 1000) {
                    window.alert.show("success", "成功", 2000);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000)
                } else {
                    window.alert.show("error", "申し訳ありません。エラーです。しばらくしてからもう一度お試しください", 2000);
                }
            },
            error: function () {
                window.alert.show("error", "申し訳ありません。エラーです。しばらくしてからもう一度お試しください", 2000);
            }
        })
    });
});
