var fs = require('fs');
var http = require('http');
var xml2js = require('xml2js');
var moment = require('moment');
var express = require('express');
var parser = new xml2js.Parser();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var app = express();
app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var array = [],
    JSONarray = [];
app.get('/', function(req, res) {
    array = [];
    JSONarray = [];
    res.render('post');
});
app.post('/add_post', function(req, res) {
    var start = req.body.start;
    var end = req.body.end;
    createArray(start, end, array).then(response => {
        validDate(response).then(response => {
            Promise.all(response.map(Date)).then(data => {
                res.render('bodies', data[data.length - 1]);
            }, error => {
                res.status(404).send('Something went wrong')
            });
        }, error => {
            res.status(404).send('Something went wrong')
        })
    }, error => {
        res.status(404).send('Something went wrong')
    });
});
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

function downloadXML(date) {
    return new Promise(function(resolve, reject) {
        if (moment(date, 'DD.MM.YYYY', true).isValid() == false || moment(date, 'DD.MM.YYYY') > moment()) {
            reject(console.log("Something went wrong. Please check your date range"));
        } else {
            var writeStream = fs.createWriteStream("official_exchange_rates(" + date + ").xml");
            http.get("http://www.bnm.org/ro/official_exchange_rates?get_xml=1&date=" + date, function(response) {
                response.pipe(writeStream.on('finish', function() {
                    resolve(date);
                }));
            });
        }
    })
}

function XML2JSON(date) {
    return new Promise(function(resolve, reject) {
        var parser = new xml2js.Parser();
        fs.readFile("official_exchange_rates(" + date + ").xml", function(err, data) {
            parser.parseString(data, function(err, result) {
                resolve(result);
            })
        });
    })
}

function Date(date) {
    return new Promise(function(resolve, reject) {
        downloadXML(date).then(response => {
            var dateFor = response;
            return dateFor;
        }, error => {
            reject("Something went wrong")
        }).then(dateFor => {
            return XML2JSON(dateFor);
        }).then(file => {
            console.log(JSON.stringify(file));
            return Push(file, JSONarray);
        }).then(data => {
            resolve(data);
        });
    })
}

function Push(data, array) {
    return new Promise(function(resolve, reject) {
        array.push(data);
        resolve(array);
    });
}

function createArray(start, end, array) {
    array = [];
    JSONarray = [];
    return new Promise(function(resolve, reject) {
        var array = [];
        if (start.match(/\d{2}\.\d{2}\.\d{4}/) == null && start != null && end.match(/\d{2}\.\d{2}\.\d{4}/) == null && end != null) {
            reject('Your date is written in an incorrect way');
        } else if (start == "" && end != null) {
            array.push(moment(end, 'DD.MM.YYYY').format("DD.MM.YYYY"));
            resolve(array);
        } else if (start != null && end == "") {
            array.push(moment(start, 'DD.MM.YYYY').format("DD.MM.YYYY"));
            resolve(array);
        } else if (start == "" & end == "") {
            array.push(moment('DD.MM.YYYY'));
            resolve(array);
        } else {
            if (moment(start, 'DD.MM.YYYY') > moment(end, 'DD.MM.YYYY')) {
                [start, end] = [end, start];
                var date = moment(start, 'DD.MM.YYYY');
                while (date <= moment(end, 'DD.MM.YYYY')) {
                    array.push(date.format("DD.MM.YYYY"));
                    date = date.clone().add(1, 'd');
                }
                resolve(array);
            } else {
                var date = moment(start, 'DD.MM.YYYY');
                while (date <= moment(end, 'DD.MM.YYYY')) {
                    array.push(date.format("DD.MM.YYYY"));
                    date = date.clone().add(1, 'd');
                }
                resolve(array);
            }
        }
    })
}

function validDate(array) {
    return new Promise(function(resolve, reject) {
        if (array == '') reject('Sorry, but some of your dates do not exist. Also, your request could consist of some dates which are earlier than 1994');
        for (var i = 0; i < array.length; i++) {
            if (moment(array[i], 'DD.MM.YYYY') > moment() || moment(array[i], 'DD.MM.YYYY') < moment('01.01.1994', 'DD.MM.YYYY') || array[i] == '') {
                reject('Sorry, but some of your dates do not exist. Also, your request could consist of some dates which are earlier than 1994')
            }
        }
        resolve(array);
    })
}

//Unit tests

function validDateTest(array, whatWeExpect) {
    validDate(array).then(ok => {console.log("Let's check your date validation !\n" + ok + ", and the expected result is " + whatWeExpect + (ok == whatWeExpect ? ', so the test passed !' : ', so, the test failed !'))}, error => {console.log("Let's check your date validation !\n" + error + ", and the expected result is " + whatWeExpect + (error == whatWeExpect ? ', so the test passed !' : ', so, the test failed !'))});
}

function createArrayTest(start, end, array, whatWeExpect) {
    createArray(start, end, array).then(ok => {console.log("Let's create an array !\n" + ok + ", and the expected result is " + whatWeExpect + (ok == whatWeExpect ? ', so the test passed !' : ', so, the test failed !'))}, error => {console.log("Let's create an array !\n" + error + ", and the expected result is " + whatWeExpect + (error == whatWeExpect ? ', so the test passed !' : ', so, the test failed !'))});
}
createArrayTest('12.07.2016', '14.09.2016', array, "12.07.2016,13.07.2016,14.07.2016,15.07.2016,16.07.2016,17.07.2016,18.07.2016,19.07.2016,20.07.2016,21.07.2016,22.07.2016,23.07.2016,24.07.2016,25.07.2016,26.07.2016,27.07.2016,28.07.2016,29.07.2016,30.07.2016,31.07.2016,01.08.2016,02.08.2016,03.08.2016,04.08.2016,05.08.2016,06.08.2016,07.08.2016,08.08.2016,09.08.2016,10.08.2016,11.08.2016,12.08.2016,13.08.2016,14.08.2016,15.08.2016,16.08.2016,17.08.2016,18.08.2016,19.08.2016,20.08.2016,21.08.2016,22.08.2016,23.08.2016,24.08.2016,25.08.2016,26.08.2016,27.08.2016,28.08.2016,29.08.2016,30.08.2016,31.08.2016,01.09.2016,02.09.2016,03.09.2016,04.09.2016,05.09.2016,06.09.2016,07.09.2016,08.09.2016,09.09.2016,10.09.2016,11.09.2016,12.09.2016,13.09.2016,14.09.2016");
createArrayTest('ololo', '15.12.2012', array, "Your date is written in an incorrect way");
createArrayTest('12.12.2015','',array, "12.12.2015");
validDateTest(['12.12.2014, 20.07.2015'], "12.12.2014, 20.07.2015");
validDateTest(['19.12.2078, 19.01.2014'], "Sorry, but some of your dates do not exist. Also, your request could consist of some dates which are earlier than 1994");
validDateTest(['10.11.2004', '01.01.1932'], "10.11.2004, 14.12.1942");
createArrayTest('', '15.12.2012', array, "15.12.2012");
createArrayTest('28.12.2012','', array, "28.12.2012");
createArrayTest('', '', array, 'Your date is written in an incorrect way');
createArrayTest('01.04.2016', '01.03.2016', array, '01.03.2016,02.03.2016,03.03.2016,04.03.2016,05.03.2016,06.03.2016,07.03.2016,08.03.2016,09.03.2016,10.03.2016,11.03.2016,12.03.2016,13.03.2016,14.03.2016,15.03.2016,16.03.2016,17.03.2016,18.03.2016,19.03.2016,20.03.2016,21.03.2016,22.03.2016,23.03.2016,24.03.2016,25.03.2016,26.03.2016,27.03.2016,28.03.2016,29.03.2016,30.03.2016,31.03.2016,01.04.2016')


