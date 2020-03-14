$(document).ready(function () {

    $.ajax({
        url: '/api/v1/header/get',
        type: 'GET',
        success: function (res) {
            $('#id').val(res.id);
            $('#title').val(res.title);
            $('#phone').val(res.phone);
            $('#work_time').val(res.workTime);
            $('#email').val(res.email);
        }

    })


    $('#submit').click(function () {
        let id = $('#id').val();
        let title = $('#title').val();
        let phone = $('#phone').val();
        let workTime = $('#work_time').val();
        let email = $('#email').val();

        let obj = {};
        obj.id = id;
        obj.title = title;
        obj.phone = phone;
        obj.workTime = workTime;
        obj.email = email;

        $.ajax({
            url: '/api/v1/header/saveOrUpdate',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(obj),
            success: function () {
                window.location.href = "/manager/header";
                window.alert.show('success',"Thành công",2000);
            },
            error: function () {
                window.alert.show('error',"Thất bại",2000);

            }
        })





    })
})