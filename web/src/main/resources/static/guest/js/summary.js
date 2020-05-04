$(document).ready(function () {

    $.ajax({
        url: "/api/v1/team/getListForGuest",
        type: 'GET',
        success: function (res) {
            let render = '';
            for(let i = 0; i < res.length; i++) {
                render +=   '<tr>' +
                                '<th>'+res[i].name+'</th>'+
                                '<td>'+res[i].detail+'</td>'+
                            '</tr>'
            }
            $('#team').html(render);
        }
    })

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