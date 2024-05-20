const chatService = require('../../services/chat/services/chatService');

class ChatController {
  async sendMessage(req, res) {
    const { userId, message } = req.body;

    try {
      const response = await chatService.sendRandomResponse(userId, message);
      res.json({ reply: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending message' });
    }
  }

  async getChatHistory(req, res) {
    const userId = req.params.userId;

    try {
      const chatHistory = await chatService.getChatHistory(userId);
      res.json(chatHistory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching chat history' });
    }
  }
}

module.exports = new ChatController();
