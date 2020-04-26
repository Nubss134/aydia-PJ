$(document).ready(function(){

    fetch('/api/v1/news/getListRecent?id=' + 3)
           .then((response) => {
               return response.json();
           })
           .then((data) => {
               console.log(data[0]);
               console.log(data[1]);
               document.getElementById("img-responsive-1").setAttribute("src", data[0].image);
               document.getElementById("stories-info-1").innerHTML = data[0].title;
               document.getElementById("date-1").innerHTML = data[0].updatedTime;
               document.getElementById("img-responsive-2").setAttribute("src", data[1].image);
               document.getElementById("stories-info-2").innerHTML = data[1].title;
               document.getElementById("date-2").innerHTML = data[1].updatedTime;
           });

})
