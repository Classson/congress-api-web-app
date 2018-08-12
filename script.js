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
            
        //get local date and calculate offset
        let nowDate = new Date();
        offset = nowDate.getTimezoneOffset();
        offsetHours = offset / 60;

        //regular expression to find hours in sunrise and set
        let hourRegex = /[0-9]+:/;
        let afterRegex = /:[0-9a-z: ]*/i;

            
        //use regExs to find hours in sunRise    
        let hourRiseObj = sunRise.match(hourRegex);
        let hourRise = hourRiseObj[0];
        let intRise = parseInt(hourRise, 10);
            
        let afterRiseHourObj = sunRise.match(afterRegex);

            
        //use regExs to find hours in sunSet
        let hourSetObj = sunSet.match(hourRegex);
        let hourSet = hourSetObj[0];
        let intSet = parseInt(hourSet, 10);
            
        let afterSetHourObj = sunSet.match(afterRegex);
        

        //substracting offset from hours
        let convRiseHour = intRise - offsetHours;
        let convSetHour = intSet - offsetHours;

        //adding the converted hours back to the minutes:seconds
        let convRise = convRiseHour + afterRiseHourObj[0];
        let convSet = convSetHour + afterSetHourObj[0];
            
        // insert converted times into html  
        document.getElementById('sunRiseTime').innerHTML = convRise;
        document.getElementById('sunSetTime').innerHTML = convSet;
        }
      }
      
      getSunInfo();
    })}





