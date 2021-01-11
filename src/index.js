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
 

//Weather function

function displayTemperature(response) {
  let city = document.querySelector("#city");
  let currentTemp = document.querySelector("#temperature");
  let currentWind = document.querySelector("#wind");
  let currentHumidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#todays-icon");

  celsiusTemperature = response.data.main.temp;

  city.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  iconElement.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt" , response.data.weather[0].description);
}

function search(city) {
  let apiKey = "58ce3f6986fa88fa9731f046fe82bae3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit (event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#new-city");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener ("submit" , handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click" ,  displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Lisbon");
