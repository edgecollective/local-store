
function connectTheDots(data){
  var c = [];
  for(i in data) {
      var x = data[i].latitude;
      var y = data[i].longitude;
      c.push([x, y]);
  }
  return c;
}


// streaming reference
var interval = setInterval(function() {

//fetch('http://localhost:8000/api/users/')
fetch('http://localhost:8000/api/user/latest')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    //console.log("hallo");
    //console.log(myJson);

var data = myJson.data;
var timestamp = [];
var latitude = [];
var longitude = [];
var altitude = [];
var temperature = [];
var xvals = [];

// get the data
for (i in data) {
  //xvals.push(i);
  xvals.push(data[i].id);
  timestamp.push(data[i].timestamp);
  latitude.push(data[i].latitude);
  longitude.push(data[i].longitude);
  altitude.push(data[i].altitude);
  temperature.push(data[i].temperature);
}




var mymap = L.map('mapid').setView([42.376, -71.0988], 15);

    

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11'
}).addTo(mymap);

var pathCoords = connectTheDots(data);
console.log(pathCoords);

var pathLine = L.polyline(pathCoords).addTo(mymap);

for (var i = 0; i < xvals.length; i++) {

  var lat = latitude[i];
  var lon = longitude[i];
  var temp = temperature[i];
  var alt = altitude[i];

  
  L.circle([lat, lon], 30, {
    color: 'red',
    fillColor: 'green',
    fillOpacity: 0.1
    }).addTo(mymap).bindPopup("Turtle: Bob");

}
  

mymap.on('click', onMapClick);


  });

  if(++cnt === 100) clearInterval(interval);
}, 1000);


