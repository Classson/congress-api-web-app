$(document).ready(function() {

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position){
      let currentLat = position.coords.latitude;
      let currentLong = position.coords.longitude;
      
      
      //reverse geolocation to get city and state
      locationURL = 'https://api.geocod.io/v1.2/reverse?q=' + currentLat + ',' + currentLong + '&api_key=0f0709bb95a0b127ab111baba9575121a11ba95'
      locationGet = new XMLHttpRequest();
      locationGet.open('GET', locationURL, true);
      locationGet.send();
      locationGet.onload = function() {
          locationInfo = JSON.parse(locationGet.responseText);

          let state = locationInfo.results[0].address_components.state;
          let city = locationInfo.results[0].address_components.city;
          console.log(state);
          console.log(city);  

          document.getElementById('location').innerHTML = `${city}, ${state}`;
        }
      
       //get info from sunrise-sunset api  
       let sunUrl = "https://api.sunrise-sunset.org/json?lat=" + currentLat + "&lng=" + currentLong + "&date=today";
      
      
       function getSunInfo() {
        dataObject = new XMLHttpRequest();
        dataObject.open('GET', sunUrl, true);
        dataObject.send();
        dataObject.onload = function() {
            
            
            sunInfo = JSON.parse(dataObject.responseText);
            sunInfo = JSON.parse(dataObject.responseText);
        
            sunSet = sunInfo.results.sunset; 
            sunRise = sunInfo.results.sunrise;
            
        //get local date and calculate offset
            let nowDate = new Date();
            offset = nowDate.getTimezoneOffset();
            offsetHours = offset / 60;

        //regular expression to find hours in sunrise and set
            let hourRegex = /[0-9]+:/;
            let afterColonRise = sunRise.substr(sunRise.indexOf(":", 3));
            let afterColonSet = sunSet.substr(sunSet.indexOf(":", 3));

            
        //use regExs to find hours in sunRise    
            let hourRiseObj = sunRise.match(hourRegex);
            let hourRise = hourRiseObj[0];
            let intRise = parseInt(hourRise, 10);

        //use regExs to find hours in sunSet
            let hourSetObj = sunSet.match(hourRegex);
            let hourSet = hourSetObj[0];
            let intSet = parseInt(hourSet, 10);
            
        //substracting offset from hours
            let convRiseHour = intRise - offsetHours;
            let convSetHour = intSet - offsetHours;

        //adding the converted hours back to the minutes:seconds
            let convRise = convRiseHour + afterColonRise;
            let convSet = convSetHour + afterColonSet;
            
        // insert converted times into html  
            document.getElementById('sunRiseTime').innerHTML = convRise;
            document.getElementById('sunSetTime').innerHTML = convSet;
            console.log(convSet);
                       
        }}
 
     //function call
      getSunInfo();
})
}


// spinner overlay
function loaderFunct() {
    console.log('running');
  document.querySelector('#sunRise').addEventListener('load', function(){
  document.getElementById("overlay").className = "hide";
});
}
loaderFunct();
    
})
    
    