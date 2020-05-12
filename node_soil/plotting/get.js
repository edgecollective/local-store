function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
//      console.log(a);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  //var month = months[a.getMonth()];
  var month = a.getMonth()+1;
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
//var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


	 //fetch('http://localhost:8000/api/users/')
fetch('http://64.227.0.108:8200/api/user/latest')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    //console.log("hallo");
    //console.log(myJson);

var data = myJson.data;
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
  temp.push(data[i].temp*9/5.+32.); //convert to F
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
//console.log(xvals.length);
// reference for plotly graphing: https://plot.ly/javascript/line-and-scatter/
// example for plotly graphing in a page: https://codepen.io/pen/?&editable=true
// reference for styles: https://plot.ly/javascript/line-and-scatter/

//console.log(xvals);
//console.log(temp);

var temp_points = [];
var vwc_points = [];
var rssi_points = [];
var batt_points = [];
for (var i=0; i<temp.length && i<xvals.length; i++) {

 temp_points[i]= {t:xvals[i],y:temp[i]};
 vwc_points[i]= {t:xvals[i],y:vwc[i]}; 
 rssi_points[i]= {t:xvals[i],y:rssi[i]};
 batt_points[i] = {t:xvals[i],y:batt[i]};
// temp_points[i]= {t:new Date(xvals[i]),y:temp[i]};
}

console.log(temp_points);


var temp_trace = {
  //x: xvals.reverse(),
  x: xvals,  
 // x: timestamp,
  y: temp, 
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
	//connectgaps: true
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

var batt_trace = {
 //x: xvals.reverse(),
  x: xvals,
 // x: timestamp,
  y: batt,
  //mode: 'markers',
  mode: 'lines+markers',
  type: 'scatter',
  //marker: { size: 6, color: 'red'}

}

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
	  fixedrange:true,
    title: {
      text: 'Temp (F)',
    },
	  range: [-40,130]
  },
  xaxis: {
	  fixedrange:true,
    title: {
      text: 'Time',
    }
  }
};

var layout_batt = {
/*   xaxis: {
    range: [ 15, 25 ]
  },
  
  yaxis: {
    range: [15, 25]
  }, 
*/
  title:'Battery Level',
  yaxis: {
	  fixedrange:true,
    title: {
      text: 'Volts',
    },
          range: [0,6]
  },
  xaxis: {
	  fixedrange:true,
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
	  fixedrange:true,
    title: {
      text: 'RSSI',
    },
          //range: [15,32]
  },
  xaxis: {
	  fixedrange:true,
    title: {
      text: 'Time',
    },
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
	  fixedrange:true,
    title: {
      text: 'VWC (%)',
    },
          range: [0,110]
  },
  xaxis: {
	  fixedrange:true,
    title: {
      text: 'Time',
    }
  }
};

/*
var batt_thresh_trace = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter' 
};

var batt_thresh_layout = {
    shapes: [
    {
        type: 'line',
        xref: 'paper',
        x0: 0,
        y0: 3.5,
        x1: 1,
        y1: 3.6,
        line:{
            color: 'rgb(255, 0, 0)',
            width: 4,
            dash:'dot'
        }
    }
    ]
}
*/

var temp_traces = [temp_trace];
var vwc_traces = [vwc_trace];
var rssi_traces = [rssi_trace];
var batt_traces = [batt_trace];

//Plotly.newPlot('myDiv_b', temp_traces,layout_temp,{displayModeBar: false});
/*Plotly.newPlot('myDiv_a', vwc_traces,layout_vwc,{displayModeBar: false});
Plotly.newPlot('myDiv_c', rssi_traces,layout_rssi,{displayModeBar: false});
Plotly.newPlot('myDiv_d', batt_traces, layout_batt,{displayModeBar: false});
*/


var ctx_temp = document.getElementById('tempChart').getContext('2d');
var tempChart = new Chart(ctx_temp, {
  type: 'line',
  data: {
    labels: xvals,
    datasets: [{
	    borderColor: "#bae755",
   borderDash: [5, 5],
            pointRadius: 1,
   backgroundColor: "#e755ba",
   pointBackgroundColor: "#55bae7",
   pointBorderColor: "#55bae7",
   pointHoverBackgroundColor: "#55bae7",
   pointHoverBorderColor: "#55bae7",
      label: 'Temp (F)',
      data: temp_points,
      borderWidth: 1
    }]
  },
  options: {
	  responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
	time: {
		unit: 'day'
	}
      }]
    }
  }
});


var ctx_vwc = document.getElementById('vwcChart').getContext('2d');
var vwcChart = new Chart(ctx_vwc, {
  type: 'line',
  data: {
    labels: xvals,
    datasets: [{
	    borderColor: "#bae755",
   borderDash: [5, 5],
	    pointRadius: 1,
   backgroundColor: "#e755ba",
   pointBackgroundColor: "#55bae7",
   pointBorderColor: "#55bae7",
   pointHoverBackgroundColor: "#55bae7",
   pointHoverBorderColor: "#55bae7",
      label: 'VWC (%)',
      data: vwc_points,
      borderWidth: 1
    }]
  },
  options: {
          responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
                unit: 'day'
        }
      }]
    }
  }
});

var ctx_batt = document.getElementById('battChart').getContext('2d');
var battChart = new Chart(ctx_batt, {
  type: 'line',
  data: {
    labels: xvals,
    datasets: [{
            borderColor: "#bae755",
   borderDash: [5, 5],
            pointRadius: 1,
   backgroundColor: "#e755ba",
   pointBackgroundColor: "#55bae7",
   pointBorderColor: "#55bae7",
   pointHoverBackgroundColor: "#55bae7",
   pointHoverBorderColor: "#55bae7",
      label: 'Battery (V)',
      data: batt_points,
      borderWidth: 1
    }]
  },
  options: {
          responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
                unit: 'day'
        }
      }]
    }
  }
});


  });



