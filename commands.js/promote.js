// 📁 commands/promote.js

module.exports = {
  name: "promote",
  execute: async (sock, msg, args) => {
    const from = msg.key.remoteJid;

    // Hakikisha iko kwenye group
    if (!from.endsWith("@g.us")) {
      return await sock.sendMessage(from, {
        text: "❌ Hii command inafanya kazi tu kwenye group.",
      });
    }

    // Hakikisha kuna mtu ambaye ame-mentioniwa
    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentions || mentions.length === 0) {
      return await sock.sendMessage(from, {
        text: "⚠️ Tumia:\n!promote @user",
      });
    }

    try {
      await sock.groupParticipantsUpdate(from, mentions, "promote");

      await sock.sendMessage(from, {
        text: `✅ Member kapewa admin.`,
      });
    } catch (err) {
      await sock.sendMessage(from, {
        text: "❌ Error kumpa admin: " + err.message,
      });
    }
  },
};
