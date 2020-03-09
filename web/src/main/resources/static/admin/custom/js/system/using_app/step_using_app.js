$(document).ready(function () {
    $(".list-step-content").sortable();
    $(".list-step-content").disableSelection();
    var appId = $("#app_id").val();
    var step = new Vue({
        el: "#modal_add_step",
        data: {
            validName: true,
            validNameLength: true,
            validContent: true,
            validContentLength: true,
            invalidNameMessage: "このフィールドは必須です。",
            invalidNameLengthMessage: "255文字以内で入力してください",
            invalidContentMessage: "このフィールドは必須です。",
            invalidContentLengthMessage: "255文字以内で入力してください",
            isUpdate: true,
            position: 0
        },
        methods: {
            updateForm: function (step) {
                $("#name").val(step.title);
                $("#content").val(step.description);
            },
            resetForm: function () {
                $("#name").val("");
                $("#content").val("");
                this.validName = true;
                this.validNameLength = true;
                this.validContent = true;
                this.validContentLength = true;
            },
            validateForm: function () {
                this.validateName();
                this.validateNameLength();
                this.validateContent();
                this.validateContentLength();
                return this.validName && this.validNameLength && this.validContent && this.validContentLength;
            },

            validateName: function () {
                var name = $("#name").val();
                if (name === null || name === undefined || name.trim() === "") {
                    this.validName = false;
                } else {
                    this.validName = true;
                }
            },

            validateNameLength: function () {
                var name = $("#name").val();
                if (name.length > 255) {
                    this.validNameLength = false;
                } else {
                    this.validNameLength = true;
                }
            },
            validateContent: function () {
                var content = $("#content").val();
                if (content === null || content === undefined || content.trim() === "") {
                    this.validContent = false;
                } else {
                    this.validContent = true;
                }
            },
            validateContentLength: function () {
                var content = $("#content").val();
                if (content.length > 255) {
                    this.validContentLength = false;
                } else {
                    this.validContentLength = true;
                }
            },
            addOrUpdateStep: function (e) {
                e.preventDefault();
                if (this.validateForm()) {

                    var step_id = $("#step_id").val();
                    var formData = new FormData();
                    formData.append("id", this.isUpdate ? step_id : "");
                    formData.append("title", $("#name").val());
                    formData.append("description", $("#content").val());
                    formData.append("position", this.position);
                    $.ajax({
                        type: "POST",
                        url: "/api/v1/app/" + appId + "/step/update",
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        data: formData,
                        success: function (response) {
                            if (response.status.code == 1000) {
                                var step_response = response.data;
                                if (step.isUpdate) {
                                    $('#block_step' + step_id + ' .name').html(response.data.title);
                                    $('#block_step' + step_id + ' .content').html(response.data.description);
                                } else {
                                    setTimeout(function () {
                                        location.reload();
                                    }, 1000);
                                }

                                $("#modal_add_step").modal("hide");
                                window.alert.show("success", "成功", 3000);
                            }
                        }
                    })
                }
            }


        }
    })

    $('#add_step').click(function () {

        step.isUpdate = false;
        step.resetForm();

    })

    $('.detail-step').click(function () {
        step.isUpdate = true;
        var stepId = $(this).attr('id');
        $("#step_id").val(stepId);
        var position = $(this).parent().attr('id').replace("position", "");
        step.position = position;
        $.ajax({
            type: "GET",
            url: "/api/v1/app/" + appId + "/step/" + stepId,
            error: function (xhr, ajaxOptions, thrownError) {
            },
            success: function (response) {
                step.updateForm(response);
            }
        })
    })
    $('.delete-step').click(function () {
        var stepId = $(this).attr('id');
        $("#btn_submit_delete").on('click', function () {
            $.ajax({
                type: "GET",
                url: "/api/v1/app/" + appId + "/step/delete/" + stepId,
                error: function (xhr, ajaxOptions, thrownError) {
                },
                success: function (response) {
                    $("#modal_delete_step").modal("hide");
                    $("#block_step" + stepId).remove();
                    window.alert.show("success", "成功", 3000);
                }
            })
        })
    })

    $("#save_order").on('click', function () {
        var listStep = [];
        $(".block-step").each(function (e) {
            var stepId = $(this).attr('id').replace("block_step", "");
            var step = {
                id: stepId,
                position: e + 1
            }
            listStep.push(step);
        })
        $.ajax({
            type: "POST",
            data: JSON.stringify(listStep),
            contentType: "application/json",
            url: "/api/v1/app/" + appId + "/step/updateOrder",
            error: function (xhr, ajaxOptions, thrownError) {
            },
            success: function (response) {
                if (response.status.code == 1000) {
                    window.alert.show("success", "成功", 2000);
                } else {
                    window.alert.show("error", "失敗", 2000);
                }
            }

        })
    })

})