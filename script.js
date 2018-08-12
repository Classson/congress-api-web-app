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

let nowDate = new Date();
offset = nowDate.getTimezoneOffset();
console.log(offset);
offsetHours = offset / 60;
console.log(offsetHours);


let numRise = "10:39:56 AM";
//regular expression to find hours in sunrise and set
let hourRegex = /[0-9]+:/;
let afterRegex = /:[0-9a-z: ]*/i;

let afterHourObj = numRise.match(afterRegex);

let hourObj = numRise.match(hourRegex);
let hour = hourObj[0];
let int = parseInt(hour, 10);

//substracting offset from hours
let convHour = int - offsetHours;


convRise = convHour + afterHourObj[0];
console.log(convRise);



