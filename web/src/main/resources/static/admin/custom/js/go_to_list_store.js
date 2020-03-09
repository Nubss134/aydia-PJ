$(document).ready(function () {
    let appId = $("#app_id").val();
    $("#list_store_page").on('click', function () {
        $.get("/api/v1/web/" + appId + "/app/getAccount", function (response) {
            console.log(response);
            window.open(response.data.address + "?email=" + response.data.username + "&password=" + response.data.email, '_blank');
        });
    });
});