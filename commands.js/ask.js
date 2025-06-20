// 📁 commands/ask.js
const axios = require("axios");

module.exports = {
  name: "ask",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;
    const question = args.join(" ");
    if (!question) {
      return await sock.sendMessage(chatId, { text: "🤖 Tumia: !ask <swali>\nMfano: !ask Nani ni rais wa Kenya?" });
    }

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: question }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const reply = res.data.choices[0].message.content.trim();
      await sock.sendMessage(chatId, { text: `🤖 ${reply}` });
    } catch (err) {
      await sock.sendMessage(chatId, {
        text: "⚠️ Samahani, chatbot haikuweza kujibu kwa sasa. Hakikisha API Key iko sawa kwenye `.env`",
      });
    }
  },
};
