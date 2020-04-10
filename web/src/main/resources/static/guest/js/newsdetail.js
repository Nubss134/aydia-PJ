$(document).ready(function(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    document.getElementById("main-detail").style.marginLeft = "200px";
    fetch('/api/v1/news/get?id=' + id)
    .then((response) => {
         return response.json();
    })
    .then((data) => {
         console.log(data);
         console.log(data.title);
         document.getElementById("image").setAttribute("src", data.image);
         document.getElementsByClassName("title")[0].innerHTML = data.title;
         document.getElementById("description").innerHTML = data.description;
         document.getElementById("content").innerHTML = data.content;
    });


})