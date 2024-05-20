const { mlapiService } = require("../mlAPI/mlapi");
const { sendSms } = require("../../chat/smsServices/newSmsService");
// const { smsService } = require("../../chat/smsServices/smsService");

// Your code here


const riskCheckingService = async (req, res) => {
    try {
        console.log("errorcalling>>", req)

        let response = await mlapiService(req, res)
        console.log("risk>>", response)



        if (response == 'High Risk') {
            // let msg = "Hey We are From e-midwife. Your "

            let highRiskPhrases = req;
            let msg = `Hey, we are from e-midwife. Our monitoring system has detected some concerning phrases in your wife's recent chat.\n\nHere is the text she entered to our chatbot:\n${highRiskPhrases}\n\nThe text she entered indicates there may be potential harm to herself or the child. It's crucial that we reach out to her as soon as possible to offer support and assistance.\n\nPlease contact her at your earliest convenience.`;

            //caling msg sending service
            // let response = await smsService(msg)

            let responseNew = await sendSms(msg)

            // console.log("response>>", response)
            console.log("response>>", responseNew)

            // if (response.send) {
            //     return {
            //         MsgSent: true
            //     }
            // }
        }




    } catch (error) {

        console.log("errorisk>>", error)
    }
}

module.exports = { riskCheckingService };