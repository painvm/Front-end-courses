var express = require('express');
var fs = require('fs');
var http = require('http');
var xml2js = require('xml2js');
var async = require('async');
var parser = new xml2js.Parser();
var moment = require('moment');

var bodyParser = require('body-parser');


var handlebars = require('express-handlebars');

var app = express();


app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var parser = new xml2js.Parser();
var array = [];
var file = [];
app.get('/', function (req, res) {
    array = [];
    file = [];
    res.render('post');
});
app.post('/add_post', function (req, res) {
    var start = req.body.start;
    var end = req.body.end;
    createArray(start, end, array);

    setTimeout(function () {
        res.render('bodies', file);
    }, 5000);


});
var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});

function createArray(start, end, array) {
    array = [];
    var date = moment(start, 'DD.MM.YYYY');
    while (date <= moment(end, 'DD.MM.YYYY')) {
        array.push(date.format("DD.MM.YYYY"));
        date = date.clone().add(1, 'd');
    }
    async.each(array, downloadXML);


}


function downloadXML(date) {
    var writeStream = fs.createWriteStream("official_exchange_rates(" + date + ").xml");
    http.get("http://www.bnm.org/ro/official_exchange_rates?get_xml=1&date=" + date, function (response) {
            response.pipe(writeStream.on('finish', function () {
                var parser = new xml2js.Parser();
                fs.readFile("official_exchange_rates(" + date + ").xml", function (err, data) {
                    parser.parseString(data, function (err, result) {
                        file.push(result);
                        console.log(JSON.stringify(file) + "\n");
                    })
                })
            }));


        }
    )
}

