$(document).ready(function(){

    $.ajax({
        url: '/api/v1/googlemap/get',
        type: 'GET',
        success: function (res) {
            $('#id').val(res.id);
            $('#address').val(res.address);
            $('#url').val(res.url);
        }
    })

    $('#submit').click(function(){
        let googlemap = { };
        googlemap.id = $('#id').val();
        googlemap.address = $('#address').val();
        googlemap.url = $('#url').val();

        if(!validate(googlemap)){
            return;
        }

        $.ajax({
            url: '/api/v1/googlemap/saveOrUpdate',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(googlemap),
            success: function(){
                window.location.href = "/manager/map";
                window.alert.show('success', "thanh cong", 2000);
            },
            error: function(){
                window.alert.show('error', "that bai", 2000);
            }

        })

    })

    function validate(data){
        if(data.address === ''){
            $('#address_help').html("所在地を入力してください");
            return false;
        }
        else{
            $('#address_help').html("");
        }
        if(data.url === ''){
            $('#url_help').html("URLを入力してください");
            return false;
        }
        else{
            $('#url_help').html("");
        }
        return true;
    }
})