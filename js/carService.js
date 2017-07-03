define(['./template.js', './clientStorage.js'], function(template, clientStorage){
    var apiUrlPath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/';
    var apiUrlLatest = apiUrlPath + 'latest-deals.php';
    var apiUrlCar = apiUrlPath + 'car.php?carId=';

    function loadMoreRequest(){
      fetchPromise().then(function(status){
        document.getElementById("connection-status").innerHTML = status;
        loadMore();
      });
    }

    function fetchPromise(){
      return new Promise(function(resolve, reject){
        fetch(apiUrlLatest + "?carId=" + clientStorage.getLastCarId()).then(function(response){
          return response.json();
        }).then(function(data){
          clientStorage.addCars(data.cars)
          .then(function(){
            data.cars.forEach(preCacheDetailsPage);
              resolve("Online");
            document.getElementById("connection-status").setAttribute("Style", "color: white; background: green");
          });
        }).catch(function(e){
          resolve("No connection");
          document.getElementById("connection-status").setAttribute("Style", "color: white; background: red");
        });
        setTimeout(function(){
          resolve("Slow connection");
        }, 3000);
      });
    }

    function loadMore(){
      clientStorage.getCars().then(function(cars){
        template.appendCars(cars);
      });
    }

    function loadCarPage(carId){
        fetch(apiUrlCar + carId)
        .then(function(response){
            return response.text();
        }).then(function(data){
            document.body.insertAdjacentHTML('beforeend', data);
        }).catch(function(){
            alert("Oops, can't retrieve page");
        })
    }

//Cache car details 
    function preCacheDetailsPage(car){
      if('serviceWorker' in navigator){
        var carDetailsUrl = apiUrlCar + car.value.details_id;
        window.caches.open('carDealsCachePagesV1').then(function(cache){
          cache.match(carDetailsUrl).then(function(response){
            if(!response) cache.add(new Request(carDetailsUrl));
          })
        })

      }
    }

    return {
        loadMoreRequest: loadMoreRequest,
        loadCarPage: loadCarPage
    }
});
