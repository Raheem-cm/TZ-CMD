// 📁 commands/admin.js

module.exports = {
  name: "admin",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;

    if (!jid.endsWith("@g.us")) {
      return await sock.sendMessage(jid, { text: "⚠️ Hii command ni ya group tu." });
    }

    try {
      // Pata info ya group
      const groupMetadata = await sock.groupMetadata(jid);
      const participants = groupMetadata.participants;

      // Filter admins
      const admins = participants.filter(p => p.admin === "admin" || p.admin === "superadmin");

      // Prepare message
      let adminList = "👑 Group Admins:\n\n";
      admins.forEach((admin, idx) => {
        const num = admin.id.split("@")[0];
        adminList += `${idx + 1}. @${num}\n`;
      });

      await sock.sendMessage(jid, {
        text: adminList,
        mentions: admins.map(a => a.id),
      });

    } catch (err) {
      await sock.sendMessage(jid, { text: "❌ Imeshindikana kupata list ya admins." });
    }
  },
};
