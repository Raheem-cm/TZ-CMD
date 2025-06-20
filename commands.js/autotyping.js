// 📁 commands/autotyping.js

module.exports = {
  name: "autotyping",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;

    if (!args[0] || !["on", "off"].includes(args[0].toLowerCase())) {
      return await sock.sendMessage(jid, {
        text: "⚙️ Format sahihi:\n!autotyping on\n!autotyping off",
      });
    }

    const status = args[0].toLowerCase();

    if (status === "on") {
      await sock.sendPresenceUpdate("composing", jid);
      await sock.sendMessage(jid, { text: "✍️ Autotyping imewashwa kwa chat hii." });
    } else {
      await sock.sendPresenceUpdate("paused", jid);
      await sock.sendMessage(jid, { text: "🛑 Autotyping imezimwa kwa chat hii." });
    }
  },
};
