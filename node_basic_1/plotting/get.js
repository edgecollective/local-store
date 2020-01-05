

fetch('http://localhost:8000/api/users/')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    //console.log("hallo");
    //console.log(myJson);

var data = myJson.data;
var temps = [];
var pressures = [];
var xvals = [];

// get the data
for (i in data) {
  xvals.push(i);
  var temp = data[i].temperature;
  temps.push(temp);
  var pressure = data[i].pressure;
  pressures.push(pressure);

}

//console.log(xvals);

// reference for plotly graphing: https://plot.ly/javascript/line-and-scatter/
// example for plotly graphing in a page: https://codepen.io/pen/?&editable=true
// reference for styles: https://plot.ly/javascript/line-and-scatter/

var temp_trace = {
  x: xvals, 
  y: temps,
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
  marker: { size: 6, color: 'red'}
};

var layout_temp = {
/*   xaxis: {
    range: [ 0.75, 5.25 ]
  },
  yaxis: {
    range: [0, 8]
  }, */
  title:'Temp (C)'
};


var pressure_trace = {
  x: xvals, 
  y: pressures,
  mode: 'lines+markers',
  type: 'scatter'
};

var layout_pressure = {
 /*  xaxis: {
    range: [ 0.75, 5.25 ]
  }, 
  yaxis: {
    range: [0, 8]
  },
  */
  title:'Pressure (mbar)'
};

//console.log(xvals);
//console.log(temps);


var traces_a = [temp_trace];

var traces_b = [pressure_trace];

Plotly.newPlot('myDiv_a', traces_a,layout_temp);

Plotly.newPlot('myDiv_b', traces_b,layout_pressure);


  });
