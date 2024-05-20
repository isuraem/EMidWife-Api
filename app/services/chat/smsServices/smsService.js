// const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID
// const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN
// const APP_NUMBER = process.env.TWILIO_ACCOUNT_FROM_NUMBER

// const client = require("twilio")(TWILIO_SID, TWILIO_AUTH)

// const smsService = async (body) => {

//     try {
//         console.log("smsCalling")
//         let msgOption = {
//             from: APP_NUMBER,
//             to: process.env.TWILIO_NUMBER,
//             body
//         }

//         const message = await client.messages.create(msgOption)
//         console.log("msg>>>", message)


//     } catch (error) {
//         console.log("errormsg>>", error)

//     }
// }

// module.exports = { smsService };