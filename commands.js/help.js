// 📁 commands/help.js
module.exports = {
  name: "help",
  execute: async (sock, msg, args) => {
    const helpText = `
*🛠️ Tz-CMD Help Menu*

🔹 Basic Commands:
- !ping → Check kama bot iko online
- !menu → Orodha kamili ya commands

🔹 Group:
- !group open | close → Fungua/Funga group
- !kick @user → Ondoa mtu

🔹 Downloads:
- !ytmp3 <link> → Pakua audio
- !ytmp4 <link> → Pakua video

🔹 Religion:
- !quran <sura aya>
- !bible <kitabu> <sura>:<aya>

🔹 Chatbot:
- !ask <swali>

ℹ️ Bot inazidi kuongezewa uwezo! Stay tuned.

*Zokou WhatsApp Bot 💡*
    `;
    await sock.sendMessage(msg.key.remoteJid, { text: helpText });
  }
};
