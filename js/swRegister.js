define([], function(){

  if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('sw.js')
    .then(function(swRegistration){

      var serviceWorker;

      if(swRegistration.installing){
      console.log('Resolved at installing: ', swRegistration);
      serviceWorker = swRegistration.installing;
    }else if(swRegistration.waiting){
      console.log('Resolved at installed/waiting: ', swRegistration);
      serviceWorker = swRegistration.waiting;
    }else if(swRegistration.active){
      console.log('Resolved at activated: ', swRegistration);
      serviceWorker = swRegistration.active;
    }

//Functions to see statechanges on serviceworker
    if(serviceWorker){
      serviceWorker.addEventListener('statechange', function(e){
        console.log(e.target.state);
      });
    }
//Functions to see updates to serviceworker
    swRegistration.addEventListener('updatefound', function(e){
      swRegistration.installing.addEventListener('statechange', function(e){
        console.log('New service worker state: ', e.target.state);
      });
      console.log('New service worker found!', swRegistration);
    });

    setInterval(function(){
      swRegistration.update();
    }, 5000);

    }).catch(function(error){
      console.log('Error occurred', error)
    });
//Functions to see changes to serviceworker
    navigator.serviceWorker.addEventListener('controllerchange', function(e){
      console.log('Controller changed!');
    });
  }

  navigator.serviceWorker.addEventListener('message', function(event){
    var clientId = event.data.clientId;
    var message = event.data.message;
    console.log('From Client: ', clientId, message);
  });

  if(navigator.serviceWorker.controller != null){
    navigator.serviceWorker.controller.postMessage('hello');
  }
});
