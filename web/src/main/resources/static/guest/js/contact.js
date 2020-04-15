$(document).ready(function () {

    $('#cf-submit').click(function () {
        let isValid = true;
        let contact = {};
        $('#appointment-form').serializeArray().forEach(function (item) {
            if(item.value === '') {
                window.alert.show('error','Vui long nhap day du thong tin',2000);
                isValid = false;
                return;
            }
            if(item.name === 'message') {
                contact[item.name] = item.value.replace(/\n/g, "<br>");
            }
            else {
                contact[item.name] = item.value;
            }

        })
        if(!isValid) {
            return
        }
        $.ajax({
            url: '/api/v1/contact/save',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(contact),
            success: function () {
                window.alert.show('success','詳細が無事送信されました！',2000);
                setInterval(function () {
                    location.reload();
                },2000);
            },
            error: function () {
                window.alert.show('error','That bai',2000);
                location.reload();
            }
        })
    })
})