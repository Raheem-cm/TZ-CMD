// 📁 commands/demote.js

module.exports = {
  name: "demote",
  execute: async (sock, msg, args) => {
    const from = msg.key.remoteJid;

    // Check kama group
    if (!from.endsWith("@g.us")) {
      return await sock.sendMessage(from, { text: "❌ Command hii ni kwa group tu." });
    }

    // Check mentioned user
    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentions || mentions.length === 0) {
      return await sock.sendMessage(from, { text: "⚠️ Tumia:\n!demote @user" });
    }

    try {
      await sock.groupParticipantsUpdate(from, mentions, "demote");

      await sock.sendMessage(from, { text: "✅ Member amepunguzwa admin." });
    } catch (err) {
      await sock.sendMessage(from, { text: "❌ Error: " + err.message });
    }
  },
};
