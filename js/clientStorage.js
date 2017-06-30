define([], function(){

  var carsInstance = localforage.createInstance({
    name: "cars"
  });

  function addCars(newCars){
    return new Promise(function(resolve, reject){
      carsInstance.setItems(newCars)
      .then(function(){
        resolve();
      });
    });
  }

  return{
    addCars: addCars
  }
});
