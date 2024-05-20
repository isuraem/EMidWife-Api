const Message = require('../../../schemas/message');
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const { riskCheckingService } = require('./riskService');

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = 'AIzaSyAb0VYAOPvmRP6p6kCSuwp2o1RNbi5Dvo4'

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});



class ChatService {
  async sendRandomResponse(userId, message) {
    console.log("userID", userId, message)
    try {

      let botmsg = `I'm a pregnant mother and ${message}. Please give me a simple and short reply.Reply should be like a text message like a daytoday conversation with a friend.`

      let messages = [{ content: botmsg }]

      // console.log("message>>", message)
      console.log("bOTAAA>>", botmsg)
      let response = await client.generateMessage({
        // required, which model to use to generate the result
        model: MODEL_NAME,
        // optional, 0.0 always uses the highest-probability result
        temperature: 0.25,
        // optional, how many candidate results to generate
        candidateCount: 1,
        // optional, number of most probable tokens to consider for generation
        top_k: 40,
        // optional, for nucleus sampling decoding strategy
        top_p: 0.95,
        prompt: {
          messages: messages,
        },
      })
      // console.log("First Response:", response[0].candidates[0]?.content)
      // console.log("resonse>>>", response)
      if (response[0].candidates[0]?.content) {
        const newMessage = new Message({ userId, message, response: response[0].candidates[0]?.content });
        let responseDB = newMessage.save();
        // console.log("res>>", responseDB)
        let responseML = await riskCheckingService(message)

        console.log("responseml", responseML);

        if (responseDB) {
          return {
            success: true,
            message: response[0].candidates[0]?.content,
            // msgSent: responseML.MsgSent ? true : false

          }

        }


      } else {
        return {
          success: false,
          message: response[0].candidates[0]?.content
        }
      }
    }
    catch (error) {
      console.log("error", error)

      return error
    }

    // client.generateMessage({
    //   // required, which model to use to generate the result
    //   model: MODEL_NAME,
    //   // optional, 0.0 always uses the highest-probability result
    //   temperature: 0.25,
    //   // optional, how many candidate results to generate
    //   candidateCount: 1,
    //   // optional, number of most probable tokens to consider for generation
    //   top_k: 40,
    //   // optional, for nucleus sampling decoding strategy
    //   top_p: 0.95,
    //   prompt: {
    //     messages: messages,
    //   },
    // }).then(result => {
    //   console.log("First Response:", result[0].candidates[0]?.content);

    //   messages.push({ content: result[0].candidates[0]?.content });
    //   console.log("mesgg>>", message)
    //   // console.log(JSON.stringify(result, null, 2));
    //   res.status(200).json({ resp: messages })

    //   const newMessage = new Message({ userId, message, response: result[0].candidates[0]?.content });
    //   return newMessage.save();
    // }).catch((error) => {
    //   console.log("err", error)
    // });




    // Choose a random response from the predefinedResponses array
    // const randomIndex = Math.floor(Math.random() * predefinedResponses.length);
    // const randomResponse = predefinedResponses[randomIndex];

    // const newMessage = new Message({ userId, message, response: randomResponse });
    // return newMessage.save();
  }

  async getChatHistory(userId) {
    try {
      return await Message.find({ userId }).sort({ timestamp: 1 });
    } catch (error) {
      throw new Error('Error fetching chat history');
    }
  }

}

module.exports = new ChatService();
