module.exports = {
  name: "alive",
  description: "Angalia kama bot iko online",
  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;

    const response = `
╭━━❰  *TZ-CMD BOT*  ❱━━╮
┃ ✅ Bot iko online!
┃ 🤖 Powered by Baileys
┃ 🔋 Status: Active
┃ 📅 Date: ${new Date().toLocaleDateString()}
┃ ⏰ Time: ${new Date().toLocaleTimeString()}
╰━━━━━━━━━━━━━━━━━━━╯
`;

    await sock.sendMessage(from, { text: response });
  },
};
