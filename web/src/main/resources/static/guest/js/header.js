$(document).ready(function () {
    $.ajax({
        url: '/api/v1/header/get',
        type: 'GET',
        success: function (res) {
            $('#id').html(res.id);
            $('#title').html(res.title);
            $('#phone').html(res.phone);
            $('#work_time').html(res.workTime);
            $('#email').html(res.email);
        }
    })
})