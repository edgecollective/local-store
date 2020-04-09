

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

//console.log(xvals);

// reference for plotly graphing: https://plot.ly/javascript/line-and-scatter/
// example for plotly graphing in a page: https://codepen.io/pen/?&editable=true
// reference for styles: https://plot.ly/javascript/line-and-scatter/

var current_trace = {
  x: xvals, 
  y: temperature,
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}
};

var voltage_trace = {
  x: xvals, 
  y: temperature,
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}
};

var resistance_trace = {
  x: xvals, 
  y: latitude,
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}
};


var layout_voltage = {
/*   xaxis: {
    range: [ 0.75, 5.25 ]
  },
  
  yaxis: {
    range: [0, 3.3]
  }, 
  */
  title:'Water Depth',
  yaxis: {
    title: {
      text: 'Meters',
    }
  },
  xaxis: {
    title: {
      text: 'index',
    }
  }
};

var layout_resistance = {
 /*  xaxis: {
    range: [ 0.75, 5.25 ]
  }, 
  yaxis: {
    range: [0, 8]
  },
  */
  title:'Resistance (K Ohm)',
  yaxis: {
    title: {
      text: 'Resistance (K Ohm)',
    }
  },
  xaxis: {
    title: {
      text: 'index',
    }
  }
  };

//console.log(xvals);
//console.log(temps);


var voltage_traces = [current_trace,voltage_trace];

var resistance_traces = [resistance_trace];


Plotly.newPlot('myDiv_a', voltage_traces,layout_voltage);

Plotly.newPlot('myDiv_b', resistance_traces,layout_resistance);


  });

  if(++cnt === 100) clearInterval(interval);
}, 1000);


