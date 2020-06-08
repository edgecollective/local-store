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
//var interval = setInterval(function() {

//fetch('http://localhost:8000/api/users/')
fetch('http://64.227.0.108:8500/api/user/latest')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    //console.log("hallo");
    console.log(myJson);

var data = myJson.data;
          console.log(data);
var xvals = [];	  
var timestamp = [];
var deviceName = [];
var devEUI = [];
var rssi = [];
var batV = [];
var analog = [];
var tempVegex = [];
var tempOnewire = [];

// get the data
for (i in data) {
	var thisDevice = data[i].deviceName;
	if (thisDevice.localeCompare('lsn50_001')==0) {
		//console.log('equal!');
	//console.log(timeConverter(data[i].dateTime));
  xvals.push(timeConverter(data[i].dateTime));
  timestamp.push(data[i].dateTime);
  deviceName.push(data[i].deviceName);
  devEUI.push(data[i].devEUI);
  rssi.push(data[i].rssi);
  batV.push(data[i].batV);
  analog.push(data[i].analog);
  tempVegex.push(9*data[i].tempVegex/5 + 32);
  tempOnewire.push(9*data[i].tempOnewire/5 + 32);
	}
}

// flip b/c of way we got the data form sql:

xvals=xvals.reverse();
timestamp=timestamp.reverse();
deviceName=deviceName.reverse();
devEUI=devEUI.reverse();
rssi=rssi.reverse();
batV=batV.reverse();
analog=analog.reverse();
tempVegex=tempVegex.reverse();
tempOnewire=tempOnewire.reverse();
//console.log(xvals);

// reference for plotly graphing: https://plot.ly/javascript/line-and-scatter/
// example for plotly graphing in a page: https://codepen.io/pen/?&editable=true
// reference for styles: https://plot.ly/javascript/line-and-scatter/

var vegex_trace = {
  //x: xvals.reverse(),
  x: xvals,  
  //x: timestamp,
  y: tempVegex, 
  //mode: 'markers',
  mode: 'markers',
  type: 'scatter',
	name: 'vegex (F)'
  //marker: { size: 6, color: 'red'}
};

var onewire_trace = {
  //x: xvals.reverse(),
  x: xvals,
  //x: timestamp,
  y: tempOnewire,
  //mode: 'markers',
  mode: 'markers',
  type: 'scatter',
	name: 'onewire (F)'
  //marker: { size: 6, color: 'red'}
};

var rssi_trace = {
  //x: xvals.reverse(),
  x: xvals,
  //x: timestamp,
  y: rssi,
  //mode: 'markers',
  mode: 'markers',
  type: 'scatter',
	name: 'RSSI'
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
      text: 'Temp (F)',
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



var temp_traces = [vegex_trace,onewire_trace];
var rssi_traces = [rssi_trace];

Plotly.newPlot('myDiv_a', temp_traces,layout_temp);
Plotly.newPlot('myDiv_b', rssi_traces,layout_rssi);

  });

//  if(++cnt === 100) clearInterval(interval);
//}, 10000);


