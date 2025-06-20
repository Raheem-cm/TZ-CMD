// 📁 commands/img.js

const axios = require("axios");

module.exports = {
  name: "img",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;
    const prompt = args.join(" ");

    if (!prompt) {
      return await sock.sendMessage(jid, {
        text: "🖼️ Tumia:\n!img <maelezo ya picha>",
      });
    }

    try {
      await sock.sendMessage(jid, {
        text: `🎨 Inatafuta picha kwa: "${prompt}"...`,
      });

      const res = await axios.get(`https://lexica.art/api/v1/search?q=${encodeURIComponent(prompt)}`);

      const results = res.data.images;

      if (!results || results.length === 0) {
        return await sock.sendMessage(jid, {
          text: "⚠️ Hakuna picha iliyopatikana kwa hilo ombi.",
        });
      }

      const imgUrl = results[0].srcSmall || results[0].src;

      await sock.sendMessage(jid, {
        image: { url: imgUrl },
        caption: `🖼️ *Prompt:* ${prompt}`,
      });
    } catch (err) {
      await sock.sendMessage(jid, {
        text: "❌ Error: " + err.message,
      });
    }
  },
};
