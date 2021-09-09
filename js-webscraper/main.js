const emailer = require('./emailer');
const logMan = require('./logManipulator');
const puppeteer = require('puppeteer');


//Create browser/scrape website for info
(async function scrape() {
     const browser = await puppeteer.launch({ headless: true });

    //Waits for page to log WA department of Ecology Site.
    const page = await browser.newPage();
    await page.goto('https://enviwa.ecology.wa.gov/home/map');

    //Wait for air quality stations list to load fully.
    await page.waitForSelector('.stationNameAndIndexValueBox');

    //Parse thru stations list to find Chehalis station and retrieve its AQ.
    let airQuality = await page.evaluate(() => {

        let stationsList = document.querySelectorAll(".stationNameAndIndexValueBox");
        let cheh;
        for (let i = 0; i < stationsList.length; i++) {
            if(stationsList[i].innerText.includes("Chehalis"))
            {
                cheh  = stationsList[i];
            }
        }

    let airQuality = cheh.querySelector("span").innerText;
    return airQuality;

});

function getCurrentAlertLevel(AQ) {
    if (AQ <= 100) {
        return 0;
    }
    else if (AQ <= 150) {
        return 1;
    }
    else if (AQ <= 200){
        return 2;
    }
    else if(AQ <= 300){
        return 3;
    }
    else if(AQ <= 500)
    {
        return 4;
    }
}
function sendEmailUpdateLog(formerAL, currentAL) {
    if (currentAL > formerAL) {
        emailer.sendEmail(currentAL, currentAQ);
        logMan.updateLog(currentAL);
        return;
    }
    else if (currentAL < formerAL) {
        emailer.sendEmail(currentAL, currentAQ);
        logMan.updateLog(currentAL);
        return;
    }
}

//Wait for browser to close resources fully.
await browser.close();
const currentAQ = airQuality;
const formerAL = logMan.getFormerAlertLevel();
const currentAL =  getCurrentAlertLevel(currentAQ);

// If the AQ has changed enough to change the alert level.
// Send an email and update alert level log.
sendEmailUpdateLog(formerAL, currentAL);

})();








