

// streaming reference
var interval = setInterval(function() {

//fetch('http://localhost:8000/api/users/')
fetch('http://64.227.0.108:8100/api/user/latest')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    //console.log("hallo");
    //console.log(myJson);

var data = myJson.data;
var timestamp = [];
var adc = [];
var batv = [];
var tempc = [];
var xvals = [];

// get the data
for (i in data) {
  //xvals.push(i);
  xvals.push(data[i].id);
  timestamp.push(data[i].timestamp);
  adc.push(data[i].adc);
  batv.push(data[i].batv);
  tempc.push(data[i].tempc);
}

//console.log(xvals);

// reference for plotly graphing: https://plot.ly/javascript/line-and-scatter/
// example for plotly graphing in a page: https://codepen.io/pen/?&editable=true
// reference for styles: https://plot.ly/javascript/line-and-scatter/

var temp_trace = {
  x: xvals,
 // x: timestamp,
  y: tempc,
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}
};

var batt_trace = {
  x: xvals, 
  y: batv,
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}
};

var humidity_trace = {
  x: xvals,
  y: adc,
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}
};

var layout_humidity = {
	title:'Volumetric Water Content (%)',
	yaxis:{
		title: {
			text: 'VWC (%)',
		},
		range:[0,100]
	},
	xaxis: {
		title: {
			text: 'index',
		}
	}
};
var layout_temp = {
/*   xaxis: {
    range: [ 15, 25 ]
  },
  
  yaxis: {
    range: [15, 25]
  }, 
*/
  title:'Temperature',
  yaxis: {
    title: {
      text: 'Temp (C)',
    },
	  range: [15,32]
  },
  xaxis: {
    title: {
      text: 'index',
    }
  }
};

var layout_voltage = {
/*   xaxis: {
    range: [ 15, 25 ]
  },

  yaxis: {
    range: [15, 25]
  },
*/
  title:'Battery Voltage',
  yaxis: {
    title: {
      text: 'Voltage (V)',
    },
	  range: [3,5]
  },
  xaxis: {
    title: {
      text: 'index',
    }
  }
};

var temp_traces = [temp_trace];

var voltage_traces = [batt_trace];

var water_traces = [humidity_trace];

Plotly.newPlot('myDiv_a', temp_traces,layout_temp);

Plotly.newPlot('myDiv_b', voltage_traces,layout_voltage);

Plotly.newPlot('myDiv_c', water_traces,layout_humidity);

  });

  if(++cnt === 100) clearInterval(interval);
}, 300);


