if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
      const currentLat = position.coords.latitude;
      const currentLong = position.coords.longitude;
      console.log(currentLat)

      function getSunInfo() {
        sunUrl = "https://api.sunrise-sunset.org/json?lat=" + currentLat + "&lng=" + currentLong + "&date=today";
        dataObject = new XMLHttpRequest();

        dataObject.open('GET', sunUrl, true);
        dataObject.send();
        dataObject.onload = function() {

          sunInfo = JSON.parse(dataObject.responseText);
          console.log(sunInfo);
        }
      }

      getSunInfo();
    })}
