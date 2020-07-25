// Global variables
var apikey = "20429f05beb7b7ddca41ce6d64ba493b";

$(document).ready(function () {
    let savedCity = getSavedCity();
    // display weather of last city in cities array using City ID query
    displayWeather(`id=${savedCity[0].id}`);

    // click event to search a city, display weather of tht city and save that city
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        // query using City Name
        let cityName = 'q=' + $("#city-input").val();
        displayWeather(cityName);
    });
});

// ajax GET request to OWM Current Weather API based on city name
function displayWeather(cityParam) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?" + cityParam + "&appid=" + apikey;

    // display today's date using moment.js API
    let today = moment().format("dddd LL");
    $("#today").text(today);

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // if response is valid, store city name and country
        storeCityName(response.name, response.sys.country, response.id);
        // based on city, get lat and lon to be used for OWM One Call API (which does not support city names)
        $("#city").text(response.name + ", " + response.sys.country);
        oneCall(response.coord.lat, response.coord.lon);
    }, function () { // callback function if Promise is rejected
        $('#city').text("City Not Found");
    });
}

// ajax 'GET' request to OWM OneCall API
function oneCall(lat, lon) {
    let units = "&units=imperial";
    let oneCallQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}${units}&exclude=minutely,hourly&appid=${apikey}`;
    let weatherIconURL = "https://openweathermap.org/img/w/";

    $.ajax({
        url: oneCallQueryURL,
        method: "GET",
    }).then(function (response) {
        // generate HTML from response
        $("#current-temp").text(response.current.temp.toFixed(0) + "\xB0F");
        $("#today-high-temp").text("High " + response.daily[0].temp.max.toFixed(0) + "\xB0F");
        $("#today-low-temp").text("Low " + response.daily[0].temp.min.toFixed(0) + "\xB0F");
        // backgroundImgURL += response.current.weather[0].main.toLowerCase() + '.jpg")';
        // console.log(backgroundImgURL);
        $("#current-weather").text(response.current.weather[0].main);
        // $('.card').css("background-image", backgroundImgURL);
        // console.log($('.card').css("background-image"));
        weatherIconURL += response.current.weather[0].icon + ".png";
        $("#current-icon").attr("src", weatherIconURL);
        $("#current-humidity").text("Humidity " + response.current.humidity + "% RH");
        let direction = getWindDirectionString(response.current.wind_deg);
        $("#current-wind").text(direction + " Wind " + response.current.wind_speed + " mph");
        $("#current-uv").text(" UV Index " + response.current.uvi);

        if (response.current.uvi < 3) {
            $('#current-uv').attr("class", "uv-low");
        } else if (response.current.uvi >= 3 && response.current.uvi < 8) {
            $('#current-uv').attr("class", "uv-mid");
        } else if (response.current.uvi >= 8) {
            $('#current-uv').attr("class", "uv-high");
        }

        getForecast(response);
    });
}

// generate HTML for 5 day forecast
function getForecast(response) {
    // console.log(response);
    for (let i = 1; i < 6; i++) {
        let day = moment().add(i, "d").format("ddd");
        $("#" + i + ">.day").text(day);
        $("#" + i + ">.high-temp").text("H " + response.daily[i].temp.max.toFixed(0) + "\xB0F");
        $("#" + i + ">.low-temp").text("L " + response.daily[i].temp.min.toFixed(0) + "\xB0F");
        $("#" + i + ">.weather-icon").attr("src", "https://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png");
        $("#" + i + ">.humidity").text(response.daily[i].humidity + "% RH");
    }
}

// convert ajax 'GET' response object's wind.deg to cardinal directions
function getWindDirectionString(degrees) {
    let windDirection = "";
    switch (true) {
        case degrees >= 348.75 || degrees < 11.25:
            windDirection = "N ";
            break;
        case degrees >= 11.25 && degrees < 33.75:
            windDirection = "NNE ";
            break;
        case degrees >= 33.75 && degrees < 56.25:
            windDirection = "NE ";
            break;
        case degrees >= 56.25 && degrees < 78.75:
            windDirection = "ENE ";
            break;
        case degrees >= 78.75 && degrees < 101.25:
            windDirection = "E ";
            break;
        case degrees >= 101.25 && degrees < 123.75:
            windDirection = "ESE ";
            break;
        case degrees >= 123.75 && degrees < 146.25:
            windDirection = "SE ";
            break;
        case degrees >= 146.25 && degrees < 168.75:
            windDirection = "SSE ";
            break;
        case degrees >= 168.75 && degrees < 191.25:
            windDirection = "S ";
            break;
        case degrees >= 191.25 && degrees < 213.75:
            windDirection = "SSW ";
            break;
        case degrees >= 213.75 && degrees < 236.25:
            windDirection = "SW ";
            break;
        case degrees >= 236.25 && degrees < 258.75:
            windDirection = "WSW ";
            break;
        case degrees >= 258.75 && degrees < 281.25:
            windDirection = "W ";
            break;
        case degrees >= 281.25 && degrees < 303.75:
            windDirection = "WNW ";
            break;
        case degrees >= 303.75 && degrees < 326.25:
            windDirection = "NW ";
            break;
        case degrees >= 326.25 && degrees < 348.75:
            windDirection = "NNW ";
            break;
        default:
            windDirection = "no value found";
    }
    return windDirection;
}

// store city into localStorage
function storeCityName(cityName, countryName, cityID) {
    let city = {
        name: cityName,
        country: countryName,
        id: cityID
    };
    localStorage.setItem("cities", JSON.stringify(city));
}

// determine if cities array has been previously stored or not
function getSavedCity() {
    const defaultCity = {
        name: "Fort Lee",
        country: "US",
        id: 5098135
    };

    let city = JSON.parse(localStorage.getItem("cities")) || [defaultCity];
    return city;
}