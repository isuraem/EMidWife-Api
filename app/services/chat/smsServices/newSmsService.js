const https = require('follow-redirects').https;

const options = {
    'method': 'POST',
    'hostname': 'k2epj1.api.infobip.com',
    'path': '/sms/2/text/advanced',
    'headers': {
        'Authorization': 'App a187fa12022eb5e3205bffe98918b7ff-e5a45965-beb5-4a6f-b3b5-5b2ab854ec77',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
};

const sendSms = (body) => {

    console.log("callingsend sms>>>>")
    const req = https.request(options, res => {
        let chunks = [];

        res.on("data", chunk => chunks.push(chunk));
        res.on("end", () => {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
        });
        res.on("error", error => console.error(error));
    });

    const postData = JSON.stringify({
        messages: [
            {
                "destinations": [{ "to": "94717295505" }],
                "from": "ServiceSMS",
                "text": body
            }
        ]
    });

    req.write(postData);
    req.end();
};

module.exports = { sendSms };