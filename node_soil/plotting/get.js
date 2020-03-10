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
      text: 'Time',
    }
  }
};

var temp_traces = [temp_trace];


Plotly.newPlot('myDiv_a', temp_traces,layout_temp);


  });

  if(++cnt === 100) clearInterval(interval);
}, 300);


