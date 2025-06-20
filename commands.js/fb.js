// 📁 commands/fb.js

const axios = require("axios");

module.exports = {
  name: "fb",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;
    const url = args[0];

    if (!url || !url.includes("facebook.com")) {
      return await sock.sendMessage(jid, {
        text: "📘 Tumia:\n!fb <Facebook video URL>",
      });
    }

    try {
      await sock.sendMessage(jid, {
        text: "⏳ Inapakua video kutoka Facebook...",
      });

      const response = await axios.get(
        `https://api.fdownloader.net/api/facebook?url=${encodeURIComponent(url)}`
      );

      const result = response.data;

      if (result.success && result.medias && result.medias.length > 0) {
        const video = result.medias.find((v) => v.quality === "hd") || result.medias[0];

        await sock.sendMessage(jid, {
          video: { url: video.url },
          caption: `🎥 Facebook Video\n📄 Quality: ${video.quality}`,
        });
      } else {
        await sock.sendMessage(jid, {
          text: "❌ Imeshindikana kupakua video. Jaribu link tofauti.",
        });
      }
    } catch (err) {
      await sock.sendMessage(jid, {
        text: "❌ Error: " + err.message,
      });
    }
  },
};
