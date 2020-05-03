$(document).ready(function(){

    $.ajax({
        url: '/api/v1/googlemap/get',
        type: 'GET',
        success: function (res) {
             let url = res.url;
             let ins = 'width = "100%"';
             resultUrl = [url.slice(0, 8), ins, url.slice(8)].join('');
//             console.log(resultUrl);
            $('.map').html(resultUrl);
        }
    })
})