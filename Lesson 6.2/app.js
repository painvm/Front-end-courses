var webdriver = require('selenium-webdriver');



    var browser = new webdriver.Builder().usingServer().withCapabilities({
        'browserName': 'chrome'
    }).build();
function BNM_Testing(first_date, end, whatIsExpected) {
    return new Promise(function (resolve, reject) {
        browser.get('http://localhost:8081');
        var start = browser.findElement(webdriver.By.name('start')), last_date = browser.findElement(webdriver.By.name('end'));
        start.sendKeys(first_date);
        last_date.sendKeys(end);
        var submit = browser.findElement(webdriver.By.css('button'));
        submit.submit();
        browser.findElements(webdriver.By.css('table')).then(function (elements) {
            console.log("Now we have " + elements.length + " element(s), and " + whatIsExpected + " element(s) must be found, so " + (elements.length == whatIsExpected ? "the test is passed" : "the test is failed"));
            resolve();
        })
    })

}

BNM_Testing('14.08.2012', '15.09.2012', 33).then(BNM_Testing('', '', 0)).then(BNM_Testing('', '12.09.2015', 1)).then(BNM_Testing('01.01.1994','', 1)).then(BNM_Testing('45', '28.12.2016', 0)).then(BNM_Testing('22.06.1941', '12.09.2015', 0));