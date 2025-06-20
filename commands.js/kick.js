// 📁 commands/kick.js
module.exports = {
  name: "kick",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith("@g.us")) {
      return await sock.sendMessage(chatId, { text: "⚠️ Command hii ni ya group tu." });
    }

    if (!msg.message.extendedTextMessage || !msg.message.extendedTextMessage.contextInfo) {
      return await sock.sendMessage(chatId, { text: "⚠️ Tafadhali reply kwa mtu unayetaka kumtoa." });
    }

    const mentionedJid = msg.message.extendedTextMessage.contextInfo.participant;

    try {
      await sock.groupParticipantsUpdate(chatId, [mentionedJid], "remove");
      await sock.sendMessage(chatId, { text: `✅ ${mentionedJid.split("@")[0]} ametolewa kwenye group.` });
    } catch (err) {
      await sock.sendMessage(chatId, { text: "❌ Imeshindikana kumtoa mtu. Hakikisha mimi ni admin." });
    }
  },
};
