const spinner = document.getElementById("spinner");
let input = document.querySelector(".input_text");
let main = document.querySelector("#name");
let tempC = document.querySelector(".tempC");
let tempF = document.querySelector(".tempF");
let desc = document.querySelector(".desc");
let button = document.querySelector(".submit");
let icon = document.querySelector(".icon");
let country = document.querySelector(".country");

input.addEventListener("keyup", function() {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".submit").click();

    spinner.removeAttribute("hidden");
    
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        input.value +
        "&appid=8cee7f2d45cd8c8754ca127ff2455bab"
    )
      .then((response) => {
        return response.json()
        })
      .then((data) => {
      
        spinner.setAttribute("hidden", "");
        console.log(data);
        let iconValue = data.weather[0].icon;
        let tempValueC = Math.round(parseFloat(data.main.temp) - 273);
        let tempValueF = Math.round(parseFloat(data.main.temp) - 273) * 1.8 + 32;
        let nameValue = data.name;
        let countryValue = data.sys.country;
        let descValue = data.weather[0].description;

        main.innerHTML = nameValue;
        icon.innerHTML = `<img src = "icons/${iconValue}.png"/>`;
        desc.innerHTML = "Description:" + " " + descValue;
        tempC.innerHTML = "Temperature:" + " " + tempValueC + "&#8451";
        tempF.innerHTML = "in Fahrenheit:" + " " + tempValueF + "&#8457";
        country.innerHTML = "Country:" + " " + countryValue;
        input.value = "";
      })

      .catch(() => alert("No such city name!"));
  }
});
