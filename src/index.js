function formatTime(timestamp) {
  let time = new Date();
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = weekDays[time.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function formatDate() {
  let date = new Date();
  let day = date.getDate();
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function displayTemperature(response) {
  let defaultTemperature = document.querySelector("#current-temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  defaultTemperature.innerHTML = celsiusTemperature + "°";
  let defaultCity = document.querySelector("#current-city");
  defaultCity.innerHTML = response.data.name;
  let defaultCountry = document.querySelector("#current-country");
  defaultCountry.innerHTML = response.data.sys.country;
  let defaultWind = document.querySelector("#wind");
  defaultWind.innerHTML = Math.round(response.data.wind.speed);
  let defaultHumid = document.querySelector("#humid");
  defaultHumid.innerHTML = response.data.main.humidity;
  let defaultDescription = document.querySelector("#description");
  defaultDescription.innerHTML = response.data.weather[0].description;
  let defaultTime = document.querySelector("#current-time");
  defaultTime.innerHTML = formatTime();
  let defaultDate = document.querySelector("#current-date");
  defaultDate.innerHTML = formatDate();
  let bigIcon = document.querySelector("#big-icon");
  let iconCode = response.data.weather[0].icon;
  bigIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

let apiKey = "437f0e611fbefb1c6c91a2a54a7dc521";
let city = "Vienna";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

function displayPrecipitation(response) {
  //console.log(response.data.list[0].pop);
  let defaultPrecip = document.querySelector("#precip");
  defaultPrecip.innerHTML = response.data.list[0].pop * 100;
}

let apiFCUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

axios.get(apiFCUrl).then(displayPrecipitation);

function searchCity(city) {
  let apiKey = "437f0e611fbefb1c6c91a2a54a7dc521";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let apiFUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiFUrl).then(displayPrecipitation);
}

function handleSubmit(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#location-input");
  let selectedCity = locationInput.value;
  searchCity(selectedCity);
}

let cityForm = document.querySelector("#location-form");
cityForm.addEventListener("submit", handleSubmit);

function showFarenheit(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(farenheitTemperature) + "°";
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = celsiusTemperature + "°";
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", showFarenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

function showLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  console.log(position);
  let apiKey = "437f0e611fbefb1c6c91a2a54a7dc521";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locateButton = document.querySelector("#locate-user");
locateButton.addEventListener("click", getCurrentLocation);
