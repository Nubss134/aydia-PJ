$(document).ready(function(){
    function renderItem(data) {
        return  '       <div class="item" style="background-image: url('+data.image+');">\n' +
                '           <div class="caption">\n'+
                '               <div class="col-md-offset-1 col-md-10" id="'+data.id+'">\n'+
                '                   <h3>'+data.contentVi+'</h3>\n'+
                '                   <h1 style="font-size:45px"><b>'+data.contentJpn+'</b></h1>\n' +
                '                   <button href="#about" style="background-color = #ffc55c !important" class="section-btn btn btn-default smoothScroll"><strong>詳しく見る</strong></button>\n' +
                '               </div>\n' +
                '           </div>\n' +
                '       </div>';
    }

    $.ajax({
        url: "/api/v1/home/getListForGuest",
        type: "GET",
        success: function(res){
            let length = res.length;
            let listRender = [];
            for(let i = 0; i < length; i++){
                let item;
                item = renderItem(res[i]);
                listRender.push(item);

            }

            $('#list_home').html('<div class="owl-carousel owl-theme" >' +
                                listRender.join('')+
                                '</div>');

             $('.owl-carousel').owlCarousel({
                animateOut: 'fadeOut',
                items:1,
                loop:true,
                autoplay:false,
                nav: false,
             })
        }
    })
})