// 📁 commands/ping.js
module.exports = {
  name: "ping",
  execute: async (sock, msg, args) => {
    await sock.sendMessage(msg.key.remoteJid, { text: "🏓 Pong! Bot is active." });
  }
};
