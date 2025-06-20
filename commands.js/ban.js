// 📁 commands/ban.js

const fs = require("fs");
const banFile = "./banlist.json";

// Load ban list
let banlist = {};
if (fs.existsSync(banFile)) {
  banlist = JSON.parse(fs.readFileSync(banFile));
}

// Save ban list
function saveBanlist() {
  fs.writeFileSync(banFile, JSON.stringify(banlist, null, 2));
}

module.exports = {
  name: "ban",
  execute: async (sock, msg, args) => {
    const from = msg.key.remoteJid;

    // Check if issuer is owner only (optional)
    // Here you can add check for bot owner only (e.g. by checking sender jid)
    const sender = msg.key.participant || msg.key.remoteJid;
    const ownerNumber = "255763111390@s.whatsapp.net"; // Badilisha na namba yako ya WhatsApp full jid

    if (sender !== ownerNumber) {
      return await sock.sendMessage(from, {
        text: "❌ Command hii ni kwa owner tu.",
      });
    }

    // Check if user to ban is provided
    if (args.length === 0) {
      return await sock.sendMessage(from, {
        text: "⚠️ Tumia:\n!ban 255763111390",
      });
    }

    const userToBan = args[0].includes("@") ? args[0] : args[0] + "@s.whatsapp.net";

    banlist[userToBan] = true;
    saveBanlist();

    await sock.sendMessage(from, {
      text: `✅ User ${args[0]} amebanned kutoka kutumia bot.`,
    });
  },
};
