var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({
    'browserName': 'chrome'
}).build();
browser.get('http://bnm.md');


BNM(0).then(BNM(1).then(BNM(2).then(BNM(3).then(BNM(4)))));


browser.close();

function BNM(i) {
    return new Promise(function (resolve, reject) {
        var currency = browser.findElements(webdriver.By.xpath("//span[@class='currency']"));
        var date = new Date();
        var DDMMYYYY = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "." + ((date.getMonth()) + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth()) + 1) + "." + date.getFullYear();
        var rates = browser.findElements(webdriver.By.css('span.currency+span.rate'));

        currency.then(function (elements) {

            elements[i].getText().then(function (element) {
                rates.then(function (rates_elements) {
                    rates_elements[i].getText().then(function (rates_element) {
                        browser.get('http://www.bnm.org/ro/official_exchange_rates?get_xml=1&date=' + DDMMYYYY);
                        browser.findElement(webdriver.By.xpath("//Valute[CharCode='" + element + "']/Value")).getAttribute('innerHTML').then(function (xmlrate) {
                            console.log(DDMMYYYY);
                            console.log(element + " " + rates_element + (rates_element == xmlrate ? ", and .XML file contains the same information" : ", but the value from .xml file is equal to " + xmlrate));
                            browser.get('http://bnm.md');
                            resolve();
                        })
                    })
                })
            });


        });
    });
}
