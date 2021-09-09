const fs = require('fs');
//This value is hard coded and will need to reflect location on deployment PC.
const logFilePath = "C:\\Users\\mattm\\source\\repos\\Air Quality Alert Emailer\\js-webscraper\\log.txt";

function getFormerAlertLevel() {
    return fs.readFileSync(logFilePath, 'utf-8');
}

function updateLog(alertLevel) {
    fs.writeFileSync(logFilePath, alertLevel.toString(), (err)=>{console.log(err)});
}

module.exports = {
    getFormerAlertLevel,
    updateLog
}

