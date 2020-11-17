// Keys and other constants
const weatherKey = "0e11ced86f40803b0622d206d4ce9d9b";
const weatherBaseUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=london,uk&units=imperial&appid=0e11ced86f40803b0622d206d4ce9d9b";

function fetchResults(url) {
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => displayWeather(responseJson))
    .catch((err) => console.log("Nope"));
}

function displayWeather(responseJson) {
  console.log(responseJson);
}

function handler() {
  console.log("JQuery is connected");
  fetchResults(weatherBaseUrl);
}

$(handler);
