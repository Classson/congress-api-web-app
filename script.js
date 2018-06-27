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
        
        sunSet = sunInfo.results.sunset; 
        sunRise = sunInfo.results.sunrise;
            
        document.getElementById('sunSetTime').innerHTML = sunSet;
        document.getElementById('sunRiseTime').innerHTML = sunRise;
        }
      }

      getSunInfo();

    })}


const rise = document.querySelector('.rise')
rise.addEventListener('click', _ => rise.classList.toggle('active'));