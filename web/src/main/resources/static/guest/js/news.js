$(document).ready(function(){

        function renderItem(data) {
            return '                        <div class="col-md-4 col-sm-6" >\n' +
                '                                <div class="news-thumb wow fadeInUp" data-wow-delay="0.2s" id="'+data.id+'">\n' +
                '                                    <img src="'+data.image+'" class="img-responsive" alt="">\n' +
                '                                    <div class="news-info" >\n' +
                '                                        <h3>'+data.title+'</h3>\n' +
                '                                        <div class="news-contact-info">\n' +
                '                                            <p>'+data.description+'</p>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>';

  }
        $.ajax({
            url: "/api/v1/news/getListForGuest1",
            type: 'GET',
            success: function(res){
                console.log("ok")
                let length = res.length;
                let listRender = [];
                for(let i = 0; i < length; i++) {
                    let item;
                    if(i % 3 === 0){
                        item = '<div class="item">\n' +
                                    renderItem(res[i])
                    }
                    if(i % 3 === 1){
                        item =      renderItem(res[i])
                    }
                    if(i % 3 === 2){
                        item =      renderItem(res[i])+
                                '</div>'
                    }
                    if(i === length - 1){
                        item += '</div>'
                    }
                    listRender.push(item);
                }
                console.log(listRender.join(''))
                $('#list_news').html('<div class="owl-carousel owl-theme" >' +
                                            listRender.join('') +
                                     '</div>');

                $('.owl-carousel').owlCarousel({
                    animateOut: 'fadeOut',
                    items:1,
                    loop:true,
                    autoplay:true,
                    nav:true,
                    navText: ["前","次"]
                })
            }
        })


    $(document).on('click', '.news-thumb', function(){
        let id = $(this).attr("id");
        window.location.href = "http://localhost:8081/detail/news/?id="+id ;
    });

})