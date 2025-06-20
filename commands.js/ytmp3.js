// 📁 commands/ytmp3.js
const axios = require("axios");

module.exports = {
  name: "ytmp3",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;
    const url = args[0];

    if (!url || !url.includes("youtube.com") && !url.includes("youtu.be")) {
      return await sock.sendMessage(chatId, {
        text: "🔗 Tafadhali weka link sahihi ya YouTube.\nMfano: !ytmp3 https://youtu.be/example",
      });
    }

    try {
      await sock.sendMessage(chatId, { text: "⏳ Inapakua audio..." });

      // Example using Vevioz API or other
      const res = await axios.get(`https://api.vevioz.com/api/button/mp3/${url}`);
      const audioLink = res.data.match(/href="([^"]+\.mp3)"/)?.[1];

      if (!audioLink) throw new Error("Haikuweza kupata audio.");

      await sock.sendMessage(chatId, {
        audio: { url: audioLink },
        mimetype: "audio/mpeg",
        fileName: "audio.mp3",
      });
    } catch (err) {
      await sock.sendMessage(chatId, {
        text: "❌ Imeshindikana kupakua audio. Jaribu link nyingine au baadaye.",
      });
    }
  },
};
