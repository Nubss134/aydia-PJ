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
            $('#title_help').html("");
            $('#phone_help').html("");
            $('#work_time_help').html("");
            $('#email_help').html("");
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

         if(!validate(obj)){
            return;
         }

        $.ajax({
            url: '/api/v1/header/saveOrUpdate',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(obj),
            success: function () {
                window.location.href = "/manager/header";
                window.alert.show('success',"完成",2000);
            },
            error: function () {
                window.alert.show('error',"失敗",2000);

            }
        })
    })

        function validate(obj){
            if(obj.title === ''){
                $('#title_help').html("タイトルを入力してください");
                return false;
            }
            else{
                $('#title_help').html("");
            }
            if(obj.phone === ''){
                $('#phone_help').html("電話番号を入力してください");
                return false;
            }
            else{
                $('#phone_help').html("");
            }
            if(obj.workTime === ''){
                $('#work_time_help').html("受付時間を入力してください");
                return false;
            }
            else{
                $('#work_time_help').html("");
            }
            if(obj.email ===''){
                $('#email_help').html("メールアドレスを入力してください");
                return false;
            }
            else{
                $('#email_help').html("");
            }
            return true;
        }
})