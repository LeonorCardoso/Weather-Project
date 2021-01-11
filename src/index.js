// day of the week and hours
let now = new Date();
let hour = now.getHours();

if (hour < 10) {
  hour = `0${hour}`;
}

let minute = now.getMinutes();

if (minute < 10) {
  minute = `0${minute}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]
let day = days[now.getDay()];

let dayWeek = document.querySelector("#day-of-the-week");
dayWeek.innerHTML = day;

let hours = document.querySelector("#hours");
hours.innerHTML = hour;

let minutes = document.querySelector("#minutes");
minutes.innerHTML = minute;

//Api variables
  let apiKey = "58ce3f6986fa88fa9731f046fe82bae3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

// search engine
function getCity(event) {
  event.preventDefault();
  let input = document.querySelector("#new-city");
  axios.get(`${apiUrl}q=${input.value}&appid=${apiKey}&&units=${units}`).then(showTemperature);
}

let form = document.querySelector("#city-input")
form.addEventListener("submit" , getCity);

// Current position temperature
function getGeolocatio() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios.get(`${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`).then(showTemperature);
}

function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = temp;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = wind;
  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;
  let iconElement = document.querySelector("#todays-icon");
  iconElement.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt" , response.data.weather[0].description);
  
}

let currentButton = document.querySelector("button");
currentButton.addEventListener("click" , getGeolocatio);
