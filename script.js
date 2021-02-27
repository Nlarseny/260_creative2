document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=e2e6fc61076820b78231459b27a0bb3e";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      // city name
      results += '<h2>Weather in ' + json.name + "</h2>";

      // loop through current weather and add an image for each icon
      for (let i=0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }

      // temperature
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += '<h4>' + 'High: ' + json.main.temp_max + "&deg;F</h4>"
      results += '<h4>' + 'Low: ' + json.main.temp_min + "&deg;F</h4>"
      results += '<h4>' + 'Feels like: ' + json.main.feels_like + "&deg;F</h4>"
      results += '<h4>' + 'Humidity: ' + json.main.humidity + "</h4>"
      results += '<h4>' + 'Pressure: ' + json.main.pressure +"</h4>"

      // wind
      results += '<h3>' + "Wind</h2>"
      results += '<h5>' + 'Degree: ' + json.wind.deg + "&deg;</h5>"
      results += '<h5>' + 'Speed: ' + json.wind.speed + "</h5>"

      results += "<p>"
      // loop through current weather and add text decription of the weather
      for (let i=0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
        results += ", "
      }
      results += "</p>";

      // mmakesure the #weatherResults includes this
      document.getElementById("weatherResults").innerHTML = results;
    });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=e2e6fc61076820b78231459b27a0bb3e";
    fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let forecast = "";
      for (let i=0; i < json.list.length; i++) {
        forecast += "<div>"
        forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
        forecast += "<p>Temperature: " + json.list[i].main.temp + "&deg;F</p>";
        forecast += "<p>High: " + json.list[i].main.temp_max + "&deg;F</p>";
        forecast += "<p>Low: " + json.list[i].main.temp_min + "&deg;F</p>";
        forecast += "<p>Humidity: " + json.list[i].main.humidity + "</p>";
        forecast += "<p>Pressure: " + json.list[i].main.pressure + "</p>";
        forecast += "<p>Feels like: " + json.list[i].main.feels_like + "&deg;F</p>";

        forecast += "<h4>Wind</h4>"
        forecast += "<p>Degree: " + json.list[i].wind.deg + "</p>";
        forecast += "<p>Speed: " + json.list[i].wind.speed + "</p>";

        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
        forecast += "</div>"
      }
    document.getElementById("forecastResults").innerHTML = forecast;
  });
});
