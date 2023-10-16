function displayTemperature(response) {
  console.log(response);
  let defaultTemperature = document.querySelector("#current-temperature");
  defaultTemperature.innerHTML = Math.round(response.data.main.temp);
  let defaultCity = document.querySelector("#current-city");
  defaultCity.innerHTML = response.data.name;
  let defaultCountry = document.querySelector("#current-country");
  defaultCountry.innerHTML = response.data.sys.country;
}

let apiKey = "437f0e611fbefb1c6c91a2a54a7dc521";
let city = "Vienna";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
