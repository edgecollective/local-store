function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
//      console.log(a);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  //var month = months[a.getMonth()];
  var month = ('0'+(a.getMonth()+1)).slice(-2);
  var date = ('0'+a.getDate()).slice(-2);
  var hour = ('0'+a.getHours()).slice(-2);
  var min = ('0'+a.getMinutes()).slice(-2);
  var sec = ('0'+a.getSeconds()).slice(-2);
//var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = year + '.' + month + '.' + date + '.' + hour + '.' + min + '.' + sec ;
  return time;
}

var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")
const sqliteToCsv = require("sqlite-to-csv");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//'use strict';

//var args = { filePath : "/media/pi/USB20FD/db.sqlite", outputPath : "./mycsv" };

var args = { filePath : "./db.sqlite", outputPath : "./mycsv" };

const fs = require('fs');

let rawdata = fs.readFileSync('secrets.json');
let config = JSON.parse(rawdata);
console.log(config);

var private_key = config.private_key;

console.log(private_key);



// https://www.npmjs.com/package/csv-export

var HTTP_PORT = 8200


// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/users", (req, res, next) => {
    
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            //"message":"success",
            "data":rows
            //rows
        })
      });
});

app.use(express.static('plotting'))

app.get("/api/user/id", (req, res, next) => {
    console.log('id');
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});






app.get("/api/user/latest", (req, res, next) => {
    console.log('all')
    //var sql = "select * from user order by timestamp desc LIMIT 10"
    var sql = "select * from user order by id desc LIMIT 500"
    var params = []
    db.all(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
}); 


app.get("/api/user/csv", (req, res, next) => {
    console.log('csv')
    //var sql = "headers on mode csv output data.csv select * from user order by timestamp desc LIMIT 10"
    sqliteToCsv.toCSV(args,
         (err) => {console.log(err); });

}); 




app.post("/api/user", (req, res, next) => {
    var errors=[]

    var object = req.body.object;

    console.log('Got body:', req.body);

    console.log(object[1]);
    console.log(object.temperatureSensor[1]);

   // console.log(req.body.pressure)

/* wifi-based variables
   var temperature = req.body.temp; // temp
   var humidity = req.body.humidity; // bat voltage
   var pressure = req.body.pressure; // VWC
*/

   var temperature = object.temperatureSensor[1];
   var humidity = object.humiditySensor[2];
   var pressure = object.barometer[3];

   var ts = Math.round((new Date()).getTime() / 1000);
   var tsh = timeConverter(ts);

   var alt = 2.;
   
    var data = {
        temp: temperature,
        humid: humidity,
        press: pressure
        //priv_key: req.body.private_key
    }

    var sql ='INSERT INTO user (dateTime,dateHuman,temperature,humidity,pressure) VALUES (?,?,?,?,?)'
    var params =[ts,tsh,data.temp, data.humid, data.press]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})



app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : undefined
    }
    db.run(
        `UPDATE user set 
           name = coalesce(?,name), 
           email = COALESCE(?,email), 
           password = coalesce(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})


app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

