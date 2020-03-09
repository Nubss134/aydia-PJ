$(document).ready(function () {
    let appId = $("#app_id").val();
    $("#download_list_category").on('click', function () {
        let href = "/api/v1/web/" + appId + "/pKikaku/downloadListCategoryCoupon";
        window.open(href, '_blank');
    })
});