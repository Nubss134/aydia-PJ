$(document).ready(function () {
    $('#cf-submit').click(function () {
        let contact = {};
        $('#appointment-form').serializeArray().forEach(function (item) {
            contact[item.name] = item.value;
        })
        console.log(contact);
        $.ajax({
            url: '/api/v1/contact/save',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(contact),
            success: function () {
                console.log("oke")
            },
            error: function () {
                console.log("fail")
            }
        })
    })
})