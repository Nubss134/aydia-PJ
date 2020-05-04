$(document).ready(function () {

    $.ajax({
        url: "/api/v1/guest/company/get",
        type: 'GET',
        success: function (res) {
            $('#name').html(res.name);
            $('#eName').html(res.eName);
            $('#representation').html(res.representation);
            $('#establishment').html(res.establishment);
            $('#address').html(res.address);
        }
    })
})