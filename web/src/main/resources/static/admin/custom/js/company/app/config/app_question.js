$(document).ready(function () {
    var appId = $("#app_id").val();

    $(".content").sortable();
    $(".content").disableSelection();

    $('#add_question').click(function () {
        resetTextForm();
    })

    // validate form add/update question
    var validateForm = $("#question_form").validate({
        errorElement: "p",
        errorClass: "error-message",
        ignore: [],
        rules: {
            title: {
                required: true,
                maxlength: 255
            },
            question: {
                required: true,
                maxlength: 225
            },
            answer: {
                required: true,
                maxlength: 255
            }
        },
        messages: {},
        submitHandler: function (form) {
            submitFormQuestion();
            return false;
        }
    });

    // submit form question
    var submitFormQuestion = function () {
        var questionId = $('#questionId').val();
        var question = {
            title: $('#title').val(),
            question: $('#question').val(),
            answer: $('#answer').val()
        }
        if (questionId != "") {
            question.id = questionId;
        }
        console.log(JSON.stringify(question));

        $.ajax({
            type: "POST",
            url: "/api/v1/web/" + appId + "/appQuestion/save",
            data: JSON.stringify(question),
            contentType: "application/json",
            beforeSend: function () {
                window.loader.show();
            },
            success: function () {
                window.loader.hide();
                window.alert.show("success", "変更しました。 ", 2000);
                setTimeout(function () {
                     location.reload();
                }, 1000)
            }
        });
    }

    $('#btn_submit_question').on('click', function () {
        if ($("#question_form").valid()) {
            $("#question_form").submit();
        }
    });

    var fillFormQuestionBeforeEdit = function (questionId) {
        var url = "/api/v1/web/" + appId + "/appQuestion/" + questionId;
        jQuery.get(url, function (question) {
            $('#title').val(question.title);
            $('#question').val(question.question);
            $('#answer').val(question.answer);
            $('#questionId').val(questionId);

        })
    }

    // edit question click function
    $('.detail-question').click(function () {
        validateForm.resetForm();
        var questionId = $(this).attr('id');
        console.log(questionId);
        fillFormQuestionBeforeEdit(questionId);
    })
    $('.delete-question').click(function () {
        var questionId = $(this).attr('id');
        $("#btn_submit_delete").on('click', function () {
            $.ajax({
                type: "POST",
                url: "/api/v1/web/" + appId + "/appQuestion/delete/" + questionId,
                error: function (xhr, ajaxOptions, thrownError) {
                },
                success: function () {
                    $("#modal_delete_question").modal("hide");
                    $("#block_question" + questionId).remove();
                    window.alert.show("success", "成功", 3000);
                }

            })
        })
    })

    // save order
    $("#save_order").on('click', function () {
        var listQuestion = [];
        $(".block-question").each(function (e) {
            var questionId = $(this).attr('id').replace("block_question", "");
            var question = {
                id: questionId,
                position: e + 1
            }
            listQuestion.push(question);
        })
        $.ajax({
            type: "POST",
            data: JSON.stringify(listQuestion),
            contentType: "application/json",
            url: "/api/v1/web/" + appId + "/appQuestion/updateOrder",
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
    });


    var resetTextForm = function () {
        $('#title').val("");
        $('#question').val("");
        $('#answer').val("");
        $('#questionId').val("");
    }
})