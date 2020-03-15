 var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")
const sqliteToCsv = require("sqlite-to-csv");

'use strict';


var args = { filePath : "db.sqlite", outputPath : "./mycsv" };

const fs = require('fs');

let rawdata = fs.readFileSync('secrets.json');
let config = JSON.parse(rawdata);
console.log(config);

var private_key = config.private_key;

console.log(private_key);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// https://www.npmjs.com/package/csv-export

var HTTP_PORT = 8300


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
    var sql = "select * from user order by id desc LIMIT 1000"
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




app.post("/api/user/", (req, res, next) => {
    var errors=[]

    console.log(req.body);
 
	var deviceName = req.body.deviceName;
	var devEUI = req.body.devEUI;
	var rssi = req.body.rxInfo[0].rssi;

	console.log(deviceName,devEUI,rssi);

    var object = req.body.object;

    console.log(object);
    
    var gps = object.gpsLocation;

    //console.log(temp);
    
    console.log("gps",gps);

    var latitude = gps['4'].latitude;
    var longitude = gps['4'].longitude;
    var altitude = gps['4'].altitude;

    var digitalInput = object.digitalInput['2'];
    var analogInput = object.analogInput['3'];
    var temperatureSensor = object.temperatureSensor['1'];


    console.log("lat",latitude);
    console.log("lon",longitude);
    console.log("alt",altitude);
    console.log("temp",temperatureSensor);
 
    console.log("digital",digitalInput);
    console.log("analogInput",analogInput);
    console.log("temperatureSensor",temperatureSensor);

   var ts = Math.round((new Date()).getTime() / 1000);

    var data = {
        latitude: latitude,
        longitude: longitude,
        altitude: altitude,
	digital:digitalInput,
	analog:analogInput,
        temperature: temperatureSensor,
	deviceName:deviceName,
	    devEUI:devEUI,
	    rssi:rssi
    }

	var sql = 'INSERT INTO user (dateTime,latitude,longitude,altitude,temperature,digital,analog,deviceName,devEUI,rssi) VALUES (?,?,?,?,?,?,?,?,?,?)'

    var params =[ts,data.latitude, data.longitude, data.altitude, data.temperature,data.digital,data.analog,data.deviceName,data.devEUI,data.rssi]

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

