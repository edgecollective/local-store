function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
//	console.log(a);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  //var month = months[a.getMonth()];
  var month = a.getMonth();
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
//var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

// streaming reference
var interval = setInterval(function() {

//fetch('http://localhost:8000/api/users/')
fetch('http://64.227.0.108:8500/api/user/latest')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    //console.log("hallo");
    //console.log(myJson);

var data = myJson.data;
          console.log(data);
var xvals = [];	  
var timestamp = [];
var deviceName = [];
var devEUI = [];
var rssi = [];
var batV = [];
var analog = [];
var temperature = [];


// get the data
for (i in data) {
  //xvals.push(i);
  //xvals.push(data[i].id);
//  xvals.push(data[i].id);
	console.log(timeConverter(data[i].dateTime));
  xvals.push(timeConverter(data[i].dateTime));
  timestamp.push(data[i].dateTime);
  deviceName.push(data[i].deviceName);
  devEUI.push(data[i].devEUI);
  rssi.push(data[i].rssi);
  batV.push(data[i].batV);
  analog.push(data[i].analog);
  temperature.push(data[i].temperature);
}

// flip b/c of way we got the data form sql:

xvals=xvals.reverse();
timestamp=timestamp.reverse();
deviceName=deviceName.reverse();
devEUI=devEUI.reverse();
rssi=rssi.reverse();
batV=batV.reverse();
analog=analog.reverse();
temperature=temperature.reverse();
//console.log(xvals);

// reference for plotly graphing: https://plot.ly/javascript/line-and-scatter/
// example for plotly graphing in a page: https://codepen.io/pen/?&editable=true
// reference for styles: https://plot.ly/javascript/line-and-scatter/

var temp_trace = {
  //x: xvals.reverse(),
  x: xvals,  
 // x: timestamp,
  y: temperature, 
  //mode: 'markers',
  mode: 'markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}
};

var rssi_trace = {
  //x: xvals.reverse(),
  x: xvals,
 // x: timestamp,
  y: rssi,
  //mode: 'markers',
  mode: 'markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}
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
	  //range: [15,32]
  },
  xaxis: {
    title: {
      text: 'Time',
    }
  }
};

var layout_rssi = {
/*   xaxis: {
    range: [ 15, 25 ]
  },
  
  yaxis: {
    range: [15, 25]
  }, 
*/
  title:'Signal Strength',
  yaxis: {
    title: {
      text: 'RSSI',
    },
          //range: [15,32]
  },
  xaxis: {
    title: {
      text: 'Time',
    }
  }
};



var temp_traces = [temp_trace];
var rssi_traces = [rssi_trace];

Plotly.newPlot('myDiv_a', temp_traces,layout_temp);
Plotly.newPlot('myDiv_b', rssi_traces,layout_rssi);

  });

  if(++cnt === 100) clearInterval(interval);
}, 1000);


