const input = document.querySelector(".input_text");
const main = document.querySelector("#name");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const icon = document.querySelector(".icon");
const clouds = document.querySelector(".clouds");
const button = document.querySelector(".submit");
const iconElement = document.querySelector("#weatherIcon");
const air = document.querySelector(".airSpeed");
const sunrise = document.querySelector(".suntime");
const sunset = document.querySelector(".sunsetime");
const iconDisplay = document.querySelector(".iconDis");
button.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input.value +
      "&appid=bd07d38f868b7474a62aa17f5d528356&units=metric"
  )
    .then((response) => response.json())
    .then((data) => {
      const tempValue = data["main"]["temp"];
      const nameValue = data["name"];
      const descValue = data["weather"][0]["description"];
      const iconValue = data["weather"][0]["icon"];
      const airValue = data["wind"]["speed"];
      const sunRiseValue = data["sys"]["sunrise"];
      const sunSetValue = data["sys"]["sunset"];
      let timeCorrection = sunRiseValue;
      const date = new Date(timeCorrection * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      let unix_times = sunSetValue;
      const dates = new Date(unix_times * 1000);
      const hour = dates.getHours();
      const minute = "0" + dates.getMinutes();
      const second = "0" + dates.getSeconds();
      const formattedTimes =
        hour + ":" + minute.substr(-2) + ":" + second.substr(-2);
      main.innerHTML = nameValue;
      desc.innerHTML = `Description : ${descValue}`;
      temp.innerHTML = `Temperature : ${tempValue}°C`;
      air.innerHTML = `Wind Speed : ${airValue}m/s`;
      sunrise.innerHTML = `Sunrise Time : ${formattedTime}`;
      sunset.innerHTML = `Sunset Time : ${formattedTimes}`;
      iconDisplay.innerHTML = `Icon Display`;
      iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${iconValue}@2x.png`
      );
      input.value = "";
    })

    .catch((err) => alert("Wrong city name!"));
});
