var carService = require('js/carService.js');

window.pageEvents = {
  loadCarPage: function(carId){
    carService.loadCarPage(carId);
  }
}

carService.loadMoreRequest();
