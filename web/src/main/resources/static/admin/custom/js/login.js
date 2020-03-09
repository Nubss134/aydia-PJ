$(document).ready(function () {
    $("#login_btn").click(function (e) {
        if ($("#username").val() == null || $("#username").val() == '' || $("#password").val() == null || $("#password").val() == '') {
            window.alert.show("error","Vui lòng nhập đầy đủ", 2000);
        } else {
            e.preventDefault();
            var param = {
                username: $("#username").val(),
                password: $("#password").val()
            };
            $.ajax({
                type: "POST",
                url: "/login",
                data: param,
                beforeSend: function () {
                    window.loader.show();
                },
                success: function () {
                    window.loader.hide();
                    window.location.href="/manager";
                },
                error: function () {
                    window.loader.hide();
                    window.alert.show("error", "Tên đăng nhập hoặc mật khẩu sai", "2000");
                }
            });
        }

    });

    $('body').keypress(function (e) {
        if (e.which == 13) {
            $('#login_btn').click();//Trigger login button click event
        }
    });

})
