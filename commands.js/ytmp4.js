// 📁 commands/ytmp4.js
const axios = require("axios");

module.exports = {
  name: "ytmp4",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;
    const url = args[0];

    if (!url || !url.includes("youtube.com") && !url.includes("youtu.be")) {
      return await sock.sendMessage(chatId, {
        text: "🎥 Tafadhali weka link sahihi ya YouTube.\nMfano: !ytmp4 https://youtu.be/example",
      });
    }

    try {
      await sock.sendMessage(chatId, { text: "⏳ Inapakua video..." });

      // Example from Vevioz or similar
      const res = await axios.get(`https://api.vevioz.com/api/button/mp4/${url}`);
      const match = res.data.match(/href="([^"]+\.mp4)"/);
      const videoLink = match ? match[1] : null;

      if (!videoLink) throw new Error("Haikuweza kupata video.");

      await sock.sendMessage(chatId, {
        video: { url: videoLink },
        mimetype: "video/mp4",
        fileName: "video.mp4",
      });
    } catch (err) {
      await sock.sendMessage(chatId, {
        text: "❌ Imeshindikana kupakua video. Link inaweza kuwa haifanyi kazi au kuna hitilafu.",
      });
    }
  },
};
