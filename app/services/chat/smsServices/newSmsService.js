const https = require('follow-redirects').https;

const options = {
    method: 'POST',
    hostname: '2v4y9m.api.infobip.com',
    path: '/sms/2/text/advanced',
    headers: {
        'Authorization': 'App 284c3501c72d6a8671d2c1a1b5eec224-6c4535a9-9311-4d88-b8e9-f4235277626d',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    maxRedirects: 20
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