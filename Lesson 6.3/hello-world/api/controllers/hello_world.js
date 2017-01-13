
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  hello: hello
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
var array = [], JSONarray = [];

function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
   array = [], JSONarray = [];
  var start = req.swagger.params.start.value || moment().format('DD.MM.YYYY'), end = req.swagger.params.end.value || start || moment().format('DD.MM.YYYY');
  var hello = util.format('Hello, %s!', start, '', end);
    createArray(start, end, array).then(response => {
        validDate(response).then(response => {
        Promise.all(response.map(Date)).then(data => {
        res.status(200).json(data[data.length - 1]);
}, error => {
        res.status(404).json('Something went wrong')
    });
}, error => {
        res.status(404).json('Something went wrong')
    })
}, error => {
        res.status(404).json('Something went wrong')
    });

  // this sends back a JSON response which is a single string

}

var fs = require('fs');
var http = require('http');
var xml2js = require('xml2js');
var moment = require('moment');





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
