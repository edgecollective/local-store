function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

// streaming reference
var interval = setInterval(function() {

//fetch('http://localhost:8000/api/users/')
fetch('http://64.227.0.108:8200/api/user/latest')
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
var vwc = [];
var temp = [];
var permit = [];
var bulk = [];
var pore = [];
var batt = [];
var deviceName = [];
var rssi = [];


// get the data
for (i in data) {
  //xvals.push(i);
  //xvals.push(data[i].id);
//  xvals.push(data[i].id);
  xvals.push(timeConverter(data[i].dateTime));
  timestamp.push(data[i].dateTime);
  vwc.push(data[i].vwc);
  temp.push(data[i].temp);
  permit.push(data[i].permit);
  bulk.push(data[i].bulk);
  pore.push(data[i].pore);
  batt.push(data[i].batt);
   rssi.push(data[i].rssi);
}

// flip b/c of way we got the data form sql:

xvals=xvals.reverse();
timestamp=timestamp.reverse();
vwc=vwc.reverse();
temp=temp.reverse();
permit=permit.reverse();
bulk=bulk.reverse();
pore=pore.reverse();
batt=batt.reverse();
rssi=rssi.reverse();

//console.log(xvals);

// reference for plotly graphing: https://plot.ly/javascript/line-and-scatter/
// example for plotly graphing in a page: https://codepen.io/pen/?&editable=true
// reference for styles: https://plot.ly/javascript/line-and-scatter/

var temp_trace = {
  //x: xvals.reverse(),
  x: xvals,  
 // x: timestamp,
  y: temp, 
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}
};

var rssi_trace = {
  //x: xvals.reverse(),
  x: xvals,
 // x: timestamp,
  y: rssi,
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}
};


var vwc_trace = {
  //x: xvals.reverse(),
  x: xvals,
 // x: timestamp,
  y: vwc,
  //mode: 'markers',
  mode: 'lines+markers',
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


var layout_vwc = {
/*   xaxis: {
    range: [ 15, 25 ]
  },

  yaxis: {
    range: [15, 25]
  },
*/
  title:'Volumetric Water Content',
  yaxis: {
    title: {
      text: 'VWC (%)',
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
var vwc_traces = [vwc_trace];
var rssi_traces = [rssi_trace];

Plotly.newPlot('myDiv_b', temp_traces,layout_temp);
Plotly.newPlot('myDiv_a', vwc_traces,layout_vwc);
Plotly.newPlot('myDiv_c', rssi_traces,layout_rssi);

  });

  if(++cnt === 100) clearInterval(interval);
}, 300);


