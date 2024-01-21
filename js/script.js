let lat;
let lon;

//Получает и отрисовывает погоду по координатам
async function showWeather(lat, lon, sity, weather) {
  let sq =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=550434b38111eec2b651a4498192e13b";
  let response = await fetch(sq);
  let data = await response.json();
  let h1 = document.querySelector("h1");
  h1.textContent = Math.round(data.main.temp - 273.15) + "°C";
  let showLocation = document.querySelector(".show__location");
  showLocation.textContent = data.weather[0].main + " in " + data.name;
}

//Смена локации
function shangeLocation() {
  let selectLocation = document.querySelector(".show__changesity-p");
  selectLocation.addEventListener("click", () => {
    document.querySelector(".show__block").style.display = "none";
    document.querySelector(".find__block").style.display = "block";
  });
}

//Поиск локации
function findLocation() {
  let input = document.querySelector(".find__text");
  let btn = document.querySelector(".find__btn");
  btn.addEventListener("click", async () => {
    try {
      let response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          input.value +
          "&appid=550434b38111eec2b651a4498192e13b"
      );
      let data = await response.json();
      console.log(data);
      console.log(data.coord.lon);
      console.log(data.coord.lat);
      console.log(data.name);
      console.log(data.weather[0].main);
      showWeather(data.coord.lat, data.coord.lon);
      document.querySelector(".show__block").style.display = "block";
      document.querySelector(".find__block").style.display = "none";
      input.value = "";
    } catch {
      document.querySelector(".show__block").style.display = "none";
      document.querySelector(".find__block").style.display = "none";
      document.querySelector(".wrong__block").style.display = "block";
      let wrongBtn = document.querySelector(".wrong__btn");
      wrongBtn.addEventListener("click", () => {
        document.querySelector(".find__block").style.display = "block";
        document.querySelector(".wrong__block").style.display = "none";
        input.value = "";
      });
    }
  });
}
//Получает текущие координаты и делает запрос погоды по ним
navigator.geolocation.getCurrentPosition(
  function (position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    showWeather(lat, lon);
  },
  async function (error) {
    console.log(error.message);
    let response = await fetch("https://api.ipify.org");
    let ip = await response.text();
    console.log(ip);
    let a = await fetch(
      "https://geo.ipify.org/api/v2/country,city?apiKey=at_LMroQWRwubArpEpUTlWFDq4o6b9nb&ipAddress=" +
        ip
    );
    let b = await a.json();
    showWeather(b.location.lat, b.location.lng);
  }
);
shangeLocation();
findLocation();
