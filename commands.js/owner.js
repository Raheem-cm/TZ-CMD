// 📁 commands/owner.js

module.exports = {
  name: "owner",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;

    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:Zokou Developer
ORG:ZokouBot Dev;
TEL;type=CELL;type=VOICE;waid=255763111390:+255610209120 
EMAIL:TZ-CMDbot chiefmamba700@gmail.com 
END:VCARD
    `.trim();

    const text = `
👤 *TZ-CMD Bot Developer Info*

📛 Name: Zokou Dev
📞 WhatsApp: +255763111390 
🌐 GitHub: https://github.com/Raheem-cm 
📣 Telegram: https://t.me/Raheem-cm 

_You can contact me for help, hosting, or custom bot development._

🔐 ZokouBot | Powerful WhatsApp Bot
`;

    await sock.sendMessage(jid, {
      contacts: {
        displayName: "Raheem Dev",
        contacts: [{ vcard }],
      },
    });

    await sock.sendMessage(jid, {
      text: text,
    });
  },
};
