// 📁 commands/group.js
module.exports = {
  name: "group",
  execute: async (sock, msg, args) => {
    const groupId = msg.key.remoteJid;
    const isGroup = groupId.endsWith("@g.us");

    if (!isGroup) {
      return await sock.sendMessage(groupId, { text: "⚠️ Hii command ni ya kwenye group tu." });
    }

    const command = args[0];
    if (command === "open") {
      await sock.groupSettingUpdate(groupId, "not_announcement");
      await sock.sendMessage(groupId, { text: "✅ Group imefunguliwa kwa wote kuchat." });
    } else if (command === "close") {
      await sock.groupSettingUpdate(groupId, "announcement");
      await sock.sendMessage(groupId, { text: "🔒 Group limefungwa, admin tu wanaweza kuchat." });
    } else {
      await sock.sendMessage(groupId, { text: "⚙️ Format sahihi: !group open | !group close" });
    }
  },
};
