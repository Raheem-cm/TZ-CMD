// 📁 commands/close.js

module.exports = {
  name: "close",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;

    // Hakikisha hii ni group
    if (!jid.endsWith("@g.us")) {
      return await sock.sendMessage(jid, {
        text: "⚠️ Hii command ni ya group tu.",
      });
    }

    try {
      await sock.groupSettingUpdate(jid, "announcement");
      await sock.sendMessage(jid, {
        text: "🔒 Group imefungwa. Ni admins tu wanaoweza kutuma ujumbe.",
      });
    } catch (err) {
      await sock.sendMessage(jid, {
        text: "❌ Imeshindikana kufunga group. Labda mimi sio admin.",
      });
    }
  },
};
