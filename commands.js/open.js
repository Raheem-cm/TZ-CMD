// 📁 commands/open.js

module.exports = {
  name: "open",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;

    // Hakikisha iko kwenye group
    if (!jid.endsWith("@g.us")) {
      return await sock.sendMessage(jid, { text: "⚠️ Hii command ni ya group tu." });
    }

    try {
      await sock.groupSettingUpdate(jid, "not_announcement");
      await sock.sendMessage(jid, { text: "✅ Group imefunguliwa. Sasa kila mtu anaweza kutuma ujumbe." });
    } catch (err) {
      await sock.sendMessage(jid, { text: "❌ Imeshindikana kufungua group. Labda mimi sio admin." });
    }
  },
};
