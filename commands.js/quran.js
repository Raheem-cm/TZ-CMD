// 📁 commands/quran.js
const axios = require("axios");

module.exports = {
  name: "quran",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;
    if (!args[0]) {
      return await sock.sendMessage(chatId, { text: "⚠️ Tumia: !quran <sura:aya>\nMfano: !quran 2:255" });
    }

    const [sura, aya] = args[0].split(":");

    try {
      const res = await axios.get(`https://api.alquran.cloud/v1/ayah/${sura}:${aya}/en.asad`);
      const data = res.data.data;
      const text = `📖 Surah ${data.surah.englishName} (${data.surah.name})\nAya ${data.numberInSurah}\n\n"${data.text}"\n\n🕋 Quran - ${data.surah.englishName}`;

      await sock.sendMessage(chatId, { text });
    } catch (err) {
      await sock.sendMessage(chatId, { text: "⚠️ Samahani, aya haikupatikana. Hakikisha format ni sahihi kama 2:255" });
    }
  },
};
