$(document).ready(function(){

       function getData(){
            $.ajax({
                url: "/api/v1/about/getAll",
                type: "GET",
                success:  function(result) {
                    console.log(result);
                    document.getElementsByClassName("title")[0].innerHTML = result[0].title;
                    document.getElementById("description").innerHTML = result[0].description;
                }
            })
       }
       getData();


})