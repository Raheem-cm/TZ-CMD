// 📁 commands/tiktok.js

const axios = require("axios");

module.exports = {
  name: "tiktok",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;
    const url = args[0];

    if (!url || !url.includes("tiktok")) {
      return await sock.sendMessage(jid, {
        text: "⚠️ Tumia:\n!tiktok <TikTok URL>",
      });
    }

    try {
      await sock.sendMessage(jid, { text: "🔄 Inapakua video kutoka TikTok..." });

      const { data } = await axios.get(`https://tikwm.com/api?url=${encodeURIComponent(url)}`);

      if (data && data.data && data.data.play) {
        await sock.sendMessage(jid, {
          video: { url: data.data.play },
          caption: `🎬 *${data.data.title || "Video kutoka TikTok"}*\n\n👤 ${data.data.author.nickname}`,
        });
      } else {
        await sock.sendMessage(jid, {
          text: "❌ Haikuweza kupakua video. Jaribu tena.",
        });
      }
    } catch (err) {
      await sock.sendMessage(jid, {
        text: "❌ Error: " + err.message,
      });
    }
  },
};
