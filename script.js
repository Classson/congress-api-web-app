if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
      let currentLat = position.coords.latitude;
      let currentLong = position.coords.longitude;

        let sunUrl = "https://api.sunrise-sunset.org/json?lat=" + currentLat + "&lng=" + currentLong + "&date=today";
      
      function getSunInfo() {
        dataObject = new XMLHttpRequest();
        dataObject.open('GET', sunUrl, true);

        dataObject.send();
        dataObject.onload = function() {

          sunInfo = JSON.parse(dataObject.responseText);
          console.log(sunInfo);
            console.log(sunInfo.results.sunset);
        
        document.getElementById(sunInfo.results.sunset).innerHTML = sunSetTime;
        }
      }

      getSunInfo();

    })}


