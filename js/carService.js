define(['./template.js', './clientStorage.js'], function(template, clientStorage){
    var apiUrlPath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/';
    var apiUrlLatest = apiUrlPath + 'latest-deals.php';
    var apiUrlCar = apiUrlPath + 'car.php?carId=';

    function loadMoreRequest(){
        fetch(apiUrlLatest).then(function(response){
          return response.json();
        }).then(function(data){
          clientStorage.addCars(data.cars)
          .then(function(){
            template.appendCars(data.cars);
          });
        })
    }

    function loadCarPage(carId){
        fetch(apiUrlCar + carId)
        .then(function(response){
            return response.text();
        }).then(function(data){
            document.body.insertAdjacentHTML('beforeend', data);
        }).catch(function(){
            alert("Oops, can't retrieve page");
        });
    }

    return {
        loadMoreRequest: loadMoreRequest,
        loadCarPage: loadCarPage
    }
});
