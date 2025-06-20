// 📁 commands/ig.js

const axios = require("axios");

module.exports = {
  name: "ig",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;
    const url = args[0];

    if (!url || !url.includes("instagram.com")) {
      return await sock.sendMessage(jid, {
        text: "📸 Tumia:\n!ig <Instagram post URL>",
      });
    }

    try {
      await sock.sendMessage(jid, {
        text: "⏳ Inapakua video/picha kutoka Instagram...",
      });

      const apiUrl = `https://api.savefrom.ws/v2/convert?url=${encodeURIComponent(url)}&from=instagram`;

      const response = await axios.get(apiUrl);

      if (
        response.data &&
        response.data.url &&
        response.data.meta &&
        response.data.meta.title
      ) {
        const media = response.data.url;

        const isVideo = media.endsWith(".mp4");

        await sock.sendMessage(jid, isVideo
          ? { video: { url: media }, caption: `🎥 ${response.data.meta.title}` }
          : { image: { url: media }, caption: `📸 ${response.data.meta.title}` }
        );
      } else {
        await sock.sendMessage(jid, {
          text: "❌ Haikuweza kupakua media. Jaribu tena.",
        });
      }
    } catch (err) {
      await sock.sendMessage(jid, {
        text: "❌ Error: " + err.message,
      });
    }
  },
};
