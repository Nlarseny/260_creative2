document.getElementById("dateSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("dateInput").value;
  if (value === "")
    return;
  console.log(value);



  const url = "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/" + value + "/" + value;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = "";
      results += '<h2>Data from USA ' + "</h2>";

      // get all the country keys
      var countries = [];
      for (let i = 0; i < json.countries.length; i++) {
        countries.push(json.countries[i]);
      }

      results += '<h4> Confirmed cases: ' + json.data[value]["USA"]["confirmed"] + "</h4>"
      results += '<h4> Deaths: ' + json.data[value]["USA"]["deaths"] + "</h4>"
      results += "<br>"



      // mmakesure the #weatherResults includes this
      document.getElementById("dataResults").innerHTML = results;
      var others = "";

      for (let i=0; i < countries.length; i++) {
        others += "<div>"
        others += "<h2> Data from " + json.countries[i] + "</h2>"
        others += "<p>Confirmed Cases: " + json.data[value][countries[i]]["confirmed"] + "</p>"
        others += "<p>Deaths: " + json.data[value][countries[i]]["deaths"] + "</p>"

        others += "</div>"
      }
      document.getElementById("otherResults").innerHTML = others;

    });


    const url2 = "https://covid-api.mmediagroup.fr/v1/cases";
    fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let result = "";
      result += "<h2> Data from Idaho today    " + "</h2>";
      result += "<h4> Confirmed cases: " + json["US"]["Idaho"]["confirmed"]  + "</h4>"
      result += "<h4> Deaths: " + json["US"]["Idaho"]["deaths"]  + "</h4>"
      result += "<br>"

      document.getElementById("moredataResults").innerHTML = result;
  });


  const url3 = "https://official-joke-api.appspot.com/random_joke";
  fetch(url3)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    let result = "";
    result += '<h2>Due to the current COVID-19 stats, here is a joke :)' + "</h2>";
    result += "<h4>" + json["setup"] + "</h4>"
    result += "<h5>" + json["punchline"] + "</h4>"
    result += "<hr>" + "<br>"

    document.getElementById("Joke").innerHTML = result;
});
});
