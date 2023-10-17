function displayTemperature(response) {
  console.log(response);
  let defaultTemperature = document.querySelector("#current-temperature");
  defaultTemperature.innerHTML = Math.round(response.data.main.temp);
  let defaultCity = document.querySelector("#current-city");
  defaultCity.innerHTML = response.data.name;
  let defaultCountry = document.querySelector("#current-country");
  defaultCountry.innerHTML = response.data.sys.country;
  let defaultWind = document.querySelector("#wind");
  defaultWind.innerHTML = Math.round(response.data.wind.speed);
  let defaultHumid = document.querySelector("#humid");
  defaultHumid.innerHTML = response.data.main.humidity;
  //let defaultPrecip = document.querySelector("#precip");
  let defaultDescription = document.querySelector("#description");
  defaultDescription.innerHTML = response.data.weather[0].description;
}

let apiKey = "437f0e611fbefb1c6c91a2a54a7dc521";
let city = "Vienna";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

function displayPrecipitation(response) {
  console.log(response);
  console.log(response.data.list[0].pop);
  let defaultPrecip = document.querySelector("#precip");
  defaultPrecip.innerHTML = response.data.list[0].pop * 100;
}

let apiFCUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

axios.get(apiFCUrl).then(displayPrecipitation);
