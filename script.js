if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
      const currentLat = position.coords.latitude;
      const currentLong = position.coords.longitude;
      console.log(currentLat)





    })}

function getSunInfo() {

  dataObject = new XMLHttpRequest();

  dataObject.open('GET', "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400", true);
  dataObject.send();
  dataObject.onload = function() {

    sunInfo = JSON.parse(dataObject.responseText);
    console.log(sunInfo);
  }
}

getSunInfo();
