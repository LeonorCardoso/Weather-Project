function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  let city = document.querySelector("#city");
  let currentTemp = document.querySelector("#temperature");
  let currentWind = document.querySelector("#wind");
  let currentHumidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#todays-icon");
  let dateElement = document.querySelector("#current-date");

  celsiusTemperature = response.data.main.temp;

  city.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  iconElement.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt" , response.data.weather[0].description);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5 ; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="col-2 forecast-time">
          <h6>${formatHours(forecast.dt * 1000)}</h6>
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="forescast-icon">
          <br />
          <h6 class="weather-forescast-temperature">
          ${Math.round(forecast.main.temp_max)}°/${Math.round(forecast.main.temp_min)}°
          </h6>
      </div>
    `;
  }
}

function search(city) {
  let apiKey = "58ce3f6986fa88fa9731f046fe82bae3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit (event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#new-city");
  search(cityInputElement.value);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  return `lat=${latitude}&lon=${longitude}`
}

function handleGeolocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
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

let currentButton = document.querySelector("button");
currentButton.addEventListener("click" , handleGeolocation);

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener ("submit" , handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click" ,  displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);



search("Lisbon");
