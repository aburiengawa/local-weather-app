var x = document.getElementById("error");

function getLocation() {
    if (navigator.geolocation) {
        getCoordinates();
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getCoordinates() {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    runWeatherApi(latitude, longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function runWeatherApi (latitude, longitude) {
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude, function(a) {  
        var temp = a.main.temp;
        var tempCel = Math.round(temp) + " C";
        var tempFah = Math.round(temp * 9/5 + 32) + " F";
        var cf = true;

        $('h2').text(a.name);    
        $('.temp').text(tempCel);

        $('#cf').click(function(){
            if (cf == true) {
                $('.temp').text(tempFah);
                cf = false;
                console.log(cf);    
            } else {
                $('.temp').text(tempCel);
                cf = true;
                console.log(cf);
            }
        });

        $('.weather').text(a.weather[0].description);
        $('img').attr('src', a.weather[0].icon);
    }); 
}

getLocation();
setInterval(getCoordinates, 300*1000);

