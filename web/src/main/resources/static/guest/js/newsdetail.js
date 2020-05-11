$(document).ready(function(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    fetch('/api/v1/news/get?id=' + id)
    .then((response) => {
         return response.json();
    })
    .then((data) => {
           document.getElementsByClassName("title")[0].innerHTML = data.title;
           document.getElementById("description").innerHTML = data.description;
           document.getElementsByClassName("news-detail-thumb")[0].innerHTML = data.content;
    });

    fetch('/api/v1/news/getListRecent?id=' + id)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById("recent-img-1").setAttribute("src", data[0].image);
        document.getElementById("recent-title-1").innerHTML = data[0].title;
        document.getElementById("a-1").setAttribute("href", "/detail/news/?id="+data[0].id );
        document.getElementById("recent-img-2").setAttribute("src", data[1].image);
        document.getElementById("recent-title-2").innerHTML = data[1].title;
        document.getElementById("a-2").setAttribute("href", "/detail/news/?id="+data[1].id );
    });

})