// 📁 commands/bible.js
const axios = require("axios");

module.exports = {
  name: "bible",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;
    if (args.length < 2) {
      return await sock.sendMessage(chatId, {
        text: "📖 Tumia: !bible <kitabu> <sura>:<aya>\nMfano: !bible John 3:16",
      });
    }

    const verseQuery = `${args[0]} ${args[1]}`; // e.g. John 3:16

    try {
      const res = await axios.get(`https://bible-api.com/${encodeURIComponent(verseQuery)}`);
      const data = res.data;

      const text = `📖 ${data.reference}\n\n"${data.text.trim()}"\n\n✝️ ${data.translation_name}`;
      await sock.sendMessage(chatId, { text });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: "⚠️ Samahani, aya haikupatikana. Tafadhali hakikisha format iko sawa kama: John 3:16",
      });
    }
  },
};
