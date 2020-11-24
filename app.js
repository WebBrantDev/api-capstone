// Keys and other constants
const newsAPIKey = "4dd63cc2e7a24f10b6632603f01023aa";
const mapsKey = "AIzaSyCmH4NlrKezXfO9y-qGCiiVIxKOsNb6Q10";
const newsBaseURL =
  "https://gnews.io/api/v4/search?q=&country=gb&max=7&token=7f8baabfb5dc81f71e3bd500c1ec6f57";
const newsDbCall =
  "https://gnews.io/api/v4/search?q=arsenal&country=gb&max=7&token=7f8baabfb5dc81f71e3bd500c1ec6f57";
const sportsDbCall =
  "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=133604";
const weatherKey = "0e11ced86f40803b0622d206d4ce9d9b";
const weatherBaseUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=london,uk&units=imperial&appid=0e11ced86f40803b0622d206d4ce9d9b";
const weatherCodes = {
  two: "images/icons/thunderstorm.png",
  three: "images/icons/drizzle.png",
  five: "images/icons/rain.png",
  six: "images/icons/snow.png",
  seven: "images/icons/cloudy.png",
  eight: "images/icons/clearSky.png",
  eightPlus: "images/icons/cloudy.png",
};

let nextMatch;

// Fetch functions that make the API calls ***************************************************
function fetchSportsDbResults(url) {
  // console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => displayFootball(responseJson))
    .catch((err) => alert("There was an error. Please try again."));
}

function fetchWeatherResults(url) {
  // console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => displayWeather(responseJson))
    .catch((err) => alert("There was an error. Please try again."));
}

function fetchNewsResults(url) {
  // console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => displayNews(responseJson))
    .catch((err) => console.log(err));
}
// ********************************************************************************************

// Used to determine which weather icon should be loaded **************************************
function getWeatherIconCode(code) {
  if (code == 800) {
    return weatherCodes.eight;
  } else if (code >= 200 && code <= 232) {
    return weatherCodes.two;
  } else if (code >= 300 && code <= 321) {
    return weatherCodes.three;
  } else if (code >= 500 && code <= 531) {
    return weatherCodes.three;
  } else if (code >= 600 && code <= 622) {
    return weatherCodes.six;
  } else if (code >= 700 && code <= 781) {
    return weatherCodes.seven;
  } else if (code >= 801 && code <= 804) {
    return weatherCodes.eightPlus;
  }
}
// **********************************************************************************************

// Display functions for each API call ********************************************************************************
function displayNews(responseJson) {
  // console.log(responseJson.articles);
  $("#articles-container").empty();
  if (!responseJson.articles) {
    $("#articles-container").append(
      "<div class='no-results'>No results!</div>"
    );
  }
  // for (let i = 0; i < responseJson.articles.length; i++) {
  //   $("#articles-container").append(`
  //   <div class="article-item">
  //   <img class="article-img" src="${responseJson.articles[i].image}" alt="Article image"/>
  //   <div class="article-title">
  //   <h3><a href="${responseJson.articles[i].url}" target="_blank">${responseJson.articles[i].title}</a></h3>
  //   <p>${responseJson.articles[i].description}</p>
  //   </div>
  //   <div class="article-sources">
  //   <p><a href="${responseJson.articles[i].source.url}" target="_blank">${responseJson.articles[i].source.name}</a></p>
  //   </div>
  //   </div>`);
  // }
}

function displayFootball(responseJson) {
  nextMatch = responseJson.events[0];
  // console.log(nextMatch);
  $("#next-match-img").append(
    `<img id="event-img" src="${nextMatch.strThumb}" />`
  );
  $("#next-match-stats").append(`<div><h4>${nextMatch.strEvent}</h4></div>
  <div>${nextMatch.dateEvent}</div>`);
}

// function configureLocation(match) {
//   if (match.strVenue == "") {
//     return "Emirates+Stadium+England";
//   } else {
//     let locationStr = "";
//     const venueArray = match.strVenue.split(" ");
//     venueArray.push(match.strCountry);
//     locationStr = venueArray.join("+");
//     console.log(locationStr);
//     return locationStr;
//   }
// }

function configureNewsCall(value) {
  const formattedURL = `https://gnews.io/api/v4/search?q=${value.join(
    "+"
  )}&country=gb&max=7&token=7f8baabfb5dc81f71e3bd500c1ec6f57`;
  console.log(formattedURL);
  fetchNewsResults(formattedURL);
}

function displayWeather(responseJson) {
  // console.log(responseJson);
  const currentWeatherCode = responseJson.weather[0].id;
  const currentTemp = Math.round(responseJson.main.temp);
  const currentWeather = responseJson.weather[0].main;
  const currentWind = Math.round(responseJson.wind.speed);
  // console.log(configureLocation(nextMatch));
  //   $("#weather-container").append(
  //     `<iframe
  //     width="600"
  //     height="450"
  //     frameborder="0"
  //     style="border: 0"
  //     src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCmH4NlrKezXfO9y-qGCiiVIxKOsNb6Q10
  // &q=${configureLocation(nextMatch)}"
  //     allowfullscreen
  //   >
  //   </iframe>`
  //   );
  $("#weather-icon").append(
    `<div class="weather-item"><img id="weather-icon" src="${getWeatherIconCode(
      currentWeatherCode
    )}" alt="${currentWeather} icon"/></div>
    <div class="weather-item">${currentWeather}</div>`
  );
  $("#weather-temp").append(`
  <div class="weather-item cur-temp">${currentTemp}</div>
  <div class="weather-item"><p>${currentWind} mph</p></div>`);
}
// ******************************************************************************************************************

// Functions related to the top button ******************************************************
function topBtnClick() {
  // Listens for click on top button and calls the topfunction
  $("#top-btn").click((e) => {
    topFunction();
  });
}

function topFunction() {
  // Sets scrollTop to 0, pulling user back to the top of the page
  document.scrollingElement.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // Toggles the hidden class based on whether the user has scrolled 100px down the page
  if (
    document.scrollingElement.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    $("#top-btn").removeClass("hidden");
  } else {
    $("#top-btn").addClass("hidden");
  }
}
// **********************************************************************************************

// Listener function ****************************************************************************

function searchSubmit() {
  $("#news-form").submit((e) => {
    e.preventDefault();
    const userValue = $("#search-bar").val().split(" ");
    configureNewsCall(userValue);
  });
}

// **********************************************************************************************
function handler() {
  // console.log("JQuery is connected");
  fetchSportsDbResults(sportsDbCall);
  fetchWeatherResults(weatherBaseUrl);
  fetchNewsResults(newsDbCall);
  topBtnClick();
  searchSubmit();
}

$(handler);
