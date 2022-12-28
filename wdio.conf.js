// const fs = require('fs');
// const passedDirectory = 'screenshots/passed';
// const failedDirectory = 'screenshots/failed';

// function createIfNotExists(dir) {
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//     }
// }

// function deleteFiles(dir) {
//     fs.rmdir(dir, { recursive: true }, err => {
//         if (err) console.log(err);
//     });
// }
const allure = require('allure-commandline');

exports.config = {
    specs: [
        './specs/**/*.js'
    ],
    exclude: [
        './specs/examples/**/*.js'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                // '--window-size=1920,1080',
                // '--headless',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-infobars'
            ]
        },
        "moz:firefoxOptions": {
            args: [
                // '-headless'
            ]
        }
    }],
    logLevel: 'silent', // trace | debug | info | warn | error | silent
    bail: 0,
    baseUrl: 'https://team8-2022brno.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'selenium-standalone'
    ],
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // onPrepare: (config, capabilities) => {
    //     deleteFiles("screenshots");
    // },
    // afterTest: (test, context, { error, result, duration, passed, retries }) => {
    //     const screenshotName = (`${test.parent}__${test.title}.png`).replace(/ /g, '_');
    //     if (passed === true) {
    //         createIfNotExists(passedDirectory);
    //         browser.saveScreenshot( `${passedDirectory}/failed/${screenshotName}`);
    //     } else {
    //         createIfNotExists(failedDirectory);
    //         browser.saveScreenshot(`${failedDirectory}/failed/${screenshotName}`);
    //     }
    // }
}
