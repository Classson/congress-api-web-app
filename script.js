function getSunInfo() {

  dataObject = new XMLHttpRequest();

  dataObject.open('GET', "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400", true);
  dataObject.send();
  dataObject.onload = function() {

    congressInfo = JSON.parse(dataObject.responseText);
    console.log(congressInfo);
  }
}

getSunInfo();
