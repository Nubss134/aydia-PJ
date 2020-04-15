$(document).ready(function () {

    function renderItem(data) {
        return '                        <div class="col-md-4 col-sm-6">\n' +
            '                                <div class="team-thumb wow fadeInUp" data-wow-delay="0.2s">\n' +
            '                                    <img src="'+data.image+'" class="img-responsive" alt="">\n' +
            '                                    <div class="team-info">\n' +
            '                                        <h3>'+data.name+'</h3>\n' +
            '                                        <p>'+data.position+'</p>\n' +
            '                                        <div class="team-contact-info">\n' +
            '                                            <p>'+data.detail+'</p>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                            </div>';
    }
    $.ajax({
        url: "/api/v1/team/getListForGuest",
        type: 'GET',
        success: function (res) {
            let length = res.length;
            let listRender = [];
            for(let i = 0; i < length; i++) {
                let item;
                if(i % 3 === 0) {
                    item =  '<div class="item">\n' +
                                renderItem(res[i])
                }
                if(i % 3 === 1) {
                    item =      renderItem(res[i])
                }
                if(i % 3 === 2 ) {
                    item =      renderItem(res[i])+
                            '</div>'
                }
                if(i === length - 1) {
                    item += '</div>'
                }
                listRender.push(item);

            }
            $('#list_team').html('<div class="owl-carousel owl-theme" >'+
                                        listRender.join('')+
                                 '</div>');

            $('.owl-carousel').owlCarousel({
                animateOut: 'fadeOut',
                items:1,
                loop:true,
                autoplay:true,
                nav: true,
                navText: ["前","次"]
            })
        }
    })
})