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


var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

//const DBSOURCE = "/media/pi/USB20FD/db.sqlite" 
const DBSOURCE = "./db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        console.log('hooray');
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dateTime INTEGER,
	    dateHuman TEXT,
            temperature FLOAT(4,2),
            humidity FLOAT(4,2),
            pressure FLOAT(4,2)
            )`,(err) => {
        if (err) {
            // Table already created
            console.log("already created");
        }else{
            // Table just created, creating some rows

    var insert ='INSERT INTO user (dateTime,dateHuman,temperature,humidity,pressure) VALUES (?,?,?,?,?)'
            var ts = Math.round((new Date()).getTime() / 1000);
	    var tsh = timeConverter(ts);
	    console.log(tsh)
            db.run(insert, [ts,tsh,0.0,0.0,0.0])
            //db.run(insert, [12123124,19.2,23.2])
        }
    })  
    }
})


module.exports = db

