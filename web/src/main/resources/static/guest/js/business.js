$(document).ready(function(){

     fetch('/api/v1/business/getAll')
        .then((response) => {
             return response.json();
        })
        .then((data) => {
               document.getElementsByClassName("news-detail-thumb")[0].innerHTML = data[0].content;
        });

})