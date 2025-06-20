// 📁 commands/groupinfo.js

module.exports = {
  name: "groupinfo",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;

    if (!jid.endsWith("@g.us")) {
      return await sock.sendMessage(jid, {
        text: "⚠️ Hii command ni ya group tu.",
      });
    }

    try {
      const groupMetadata = await sock.groupMetadata(jid);

      const title = groupMetadata.subject || "N/A";
      const description = groupMetadata.desc || "Hakuna maelezo";
      const owner = groupMetadata.owner || "N/A";
      const participants = groupMetadata.participants || [];
      const admins = participants.filter(
        (p) => p.admin === "admin" || p.admin === "superadmin"
      );
      const membersCount = participants.length;
      const adminsCount = admins.length;

      const info = `📋 *Group Info*\n
📛 Jina: ${title}
🆔 ID: ${jid}
👑 Admins: ${adminsCount}
👥 Members: ${membersCount}
📜 Maelezo: ${description}
🧑‍💼 Mmiliki: @${owner.split("@")[0]}
`;

      await sock.sendMessage(jid, {
        text: info,
        mentions: [owner],
      });
    } catch (err) {
      await sock.sendMessage(jid, {
        text: "❌ Imeshindikana kupata taarifa za group.",
      });
    }
  },
};
