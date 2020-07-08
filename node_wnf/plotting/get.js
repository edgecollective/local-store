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



var urlParams = new URLSearchParams(window.location.search);

var limit = 3000;

var param_limit = urlParams.get('limit');

if (param_limit !== null) {
limit = parseInt(param_limit);
}


var base_url = 'http://64.227.0.108:8400/api/latest'
var fetch_url = base_url;



	 //fetch('http://localhost:8000/api/users/')
//fetch('http://64.227.0.108:8100/api/user/latest')
fetch(fetch_url)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    //console.log("hallo");
    //console.log(myJson);

var data = myJson.data;
var xvals = [];	  
var timestamp = [];
var ta = [];
var tp1 = [];
	  	var tp2 = [];
	 var ha = [];
var pa = [];
	  var BatV = [];
var deviceName = [];
var rssi = [];


// get the data
for (i in data) {
  //xvals.push(i);
  //xvals.push(data[i].id);
//  xvals.push(data[i].id);
  xvals.push(timeConverter(data[i].dateTime));
  timestamp.push(data[i].dateTime);
  ta.push(data[i].ta);
	ha.push(data[i].ha);
pa.push(data[i].pa);	
  tp1.push(data[i].tp1);
  tp2.push(data[i].tp2);
  rssi.push(data[i].rssi);
	BatV.push(data[i].BatV);
}

// flip b/c of way we got the data form sql:

xvals=xvals.reverse();
timestamp=timestamp.reverse();
ta=ta.reverse();
ha=ha.reverse();
pa=pa.reverse();
BatV=BatV.reverse();
tp1=tp1.reverse();
tp2=tp2.reverse();
rssi=rssi.reverse();

//console.log(xvals);
//console.log(xvals.length);
// reference for plotly graphing: https://plot.ly/javascript/line-and-scatter/
// example for plotly graphing in a page: https://codepen.io/pen/?&editable=true
// reference for styles: https://plot.ly/javascript/line-and-scatter/

//console.log(xvals);
//console.log(temp);

var ta_points = [];
var ha_points = [];
var pa_points = [];
var tp1_points = [];
var tp2_points = [];
var BatV_points = [];
var rssi_points = [];
for (var i=0; i<ta.length && i<xvals.length; i++) {

 ta_points[i]= {t:xvals[i],y:ta[i]};
	ha_points[i]= {t:xvals[i],y:ha[i]};
	pa_points[i]= {t:xvals[i],y:pa[i]};
	tp1_points[i]= {t:xvals[i],y:tp1[i]};
        tp2_points[i]= {t:xvals[i],y:tp2[i]};
BatV_points[i] = {t:xvals[i],y:BatV[i]};

 rssi_points[i]= {t:xvals[i],y:rssi[i]};

// temp_points[i]= {t:new Date(xvals[i]),y:temp[i]};
}

console.log(ta_points);

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
      label: 'Temp (C)',
      data: ta_points,
      borderWidth: 1
    }]
  },
  options: {
	  responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
	/*time: {
		unit: 'hour'
	}*/
      }]
    }
  }
});

var ctx_ha = document.getElementById('humidChart').getContext('2d');
var tempChart = new Chart(ctx_ha, {
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
      label: 'Temp (C)',
      data: ha_points,
      borderWidth: 1
    }]
  },
  options: {
	  responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
	/*time: {
		unit: 'hour'
	}*/
      }]
    }
  }
});

var ctx_tp1 = document.getElementById('tp1Chart').getContext('2d');
var tp1Chart = new Chart(ctx_tp1, {
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
      label: 'Temp Probe 1 (C)',
      data: tp1_points,
      borderWidth: 1
    }]
  },
  options: {
	  responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
	/*time: {
		unit: 'hour'
	}*/
      }]
    }
  }
});

var ctx_tp2 = document.getElementById('tp2Chart').getContext('2d');
var tp1Chart = new Chart(ctx_tp2, {
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
      label: 'Temp Probe 2 (C)',
      data: tp2_points,
      borderWidth: 1
    }]
  },
  options: {
	  responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
	/*time: {
		unit: 'hour'
	}*/
      }]
    }
  }
});


var ctx_rssi = document.getElementById('rssiChart').getContext('2d');
var rssiChart = new Chart(ctx_rssi, {
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
      label: 'RSSI (dB)',
      data: rssi_points,
      borderWidth: 1
    }]
  },
  options: {
          responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
        /*time: {
                unit: 'hour'
        }*/
      }]
    }
  }
});


var ctx_humid = document.getElementById('humidChart').getContext('2d');
var humidChart = new Chart(ctx_humid, {
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
      label: 'Humidity (%)',
      data: ha_points,
      borderWidth: 1
    }]
  },
  options: {
          responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
        /*time: {
                unit: 'hour'
        }*/
      }]
    }
  }
});


  });



