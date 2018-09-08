
//geolocation to get lat and long
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) 
    {
      let currentLat = position.coords.latitude;
      let currentLong = position.coords.longitude;
      
    // reverse geolocation to get city and state
      locationURL = 'https://api.geocod.io/v1.2/reverse?q=' + currentLat + ',' + currentLong + '&api_key=0f0709bb95a0b127ab111baba9575121a11ba95'
      locationGet = new XMLHttpRequest();
      locationGet.open('GET', locationURL, true);
      locationGet.send();
      locationGet.onload = function() 
        {
            locationInfo = JSON.parse(locationGet.responseText);

            state = locationInfo.results[0].address_components.state;
            city = locationInfo.results[0].address_components.city;
            console.log(state);
            console.log(city);  

            document.getElementById('city').innerHTML = city;
        }
      
    // get info from sunrise-sunset api  
    let sunUrl = "https://api.sunrise-sunset.org/json?lat=" + currentLat + "&lng=" + currentLong + "&date=today";
      
      function getSunInfo() 
        {
        dataObject = new XMLHttpRequest();
        dataObject.open('GET', sunUrl, true);

        dataObject.send();
        dataObject.onload = function() 
            {

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
})
}

//function triangle(num) {
//    let tri = '';
//    for(let i = 0; i < num; i++){
//        tri += '*';
//        console.log(tri);
//    }
//}
//
//triangle(7);

//Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.
//

//function fizzBuzz() {
//    for(let i = 1; i <= 100; i++){
//        if((i % 3 === 0) && (i % 5 === 0)){
//            console.log('FizzBuzz')
//        }
//        if(i % 3 === 0){
//            console.log('Fizz')
//        }
//        else if(i % 5 === 0){
//            console.log('Buzz')
//        }
//        else {
//            console.log(i)
//        }
//    }
//}
//
//fizzBuzz();

function chessBoard (num) {
    let board = '';
    let row = '';
    let secNum = 1;
    for(let j = 0; j < num; j++){
        if(num % 2 === 0){ secNum ++;}
        for(let i = 0; i < num; i++){
            if(secNum % 2 === 0){
                row += ' ';
            }
            else {
                row += '#';
            }
            secNum += 1;
        }
        row += "\n"
    }
    board += row;
    console.log(board);
}

chessBoard(8);
