//Email library
const nodemailer = require('nodemailer');
const alert0 = "Normal to Moderate";
const alert1 = "Unhealthy for sensitive groups";
const alert2 = "Unhealthy";
const alert3 = "Very Unhealthy";
const alert4 = "Hazardous";

//Get AQ detail message
function getAlertMessage(alertLevel) {
    switch (alertLevel) {
        case 0:
            return alert0;
            break;
        case 1:
            return alert1;
            break;
        case 2:
            return alert2;
            break;
        case 3:
            return alert3;
            break;
        case 4:
            return alert4;
            break;
        default:
            return "An error has occured";
            break;
    }
}

//Create sender email obj.
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'wagamerhouse@gmail.com',
        pass: 'redacted'
    }
});

//Send email
function sendEmail(alertLevel, airQuality) {

    //Create receipient email obj.
    let mailOptions = {
        from: 'wagamerhouse@gmail.com',
        to: 'mattm@lcpud.org',
        subject: 'Sending email via Node.js',
        text: `The current air quality index in Chehalis Wa at ${Date(Date.now())} is ${airQuality} : ${getAlertMessage(alertLevel)}.`
};

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        else{
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = {
    sendEmail
}
