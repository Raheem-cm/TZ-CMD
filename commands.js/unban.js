// 📁 commands/unban.js

const fs = require("fs");
const banFile = "./banlist.json";

let banlist = {};
if (fs.existsSync(banFile)) {
  banlist = JSON.parse(fs.readFileSync(banFile));
}

function saveBanlist() {
  fs.writeFileSync(banFile, JSON.stringify(banlist, null, 2));
}

module.exports = {
  name: "unban",
  execute: async (sock, msg, args) => {
    const from = msg.key.remoteJid;

    // Check owner only
    const sender = msg.key.participant || msg.key.remoteJid;
    const ownerNumber = "255712345678@s.whatsapp.net"; // Badilisha hapa na namba yako

    if (sender !== ownerNumber) {
      return await sock.sendMessage(from, {
        text: "❌ Command hii ni kwa owner tu.",
      });
    }

    if (args.length === 0) {
      return await sock.sendMessage(from, {
        text: "⚠️ Tumia:\n!unban 255712345678",
      });
    }

    const userToUnban = args[0].includes("@") ? args[0] : args[0] + "@s.whatsapp.net";

    if (!banlist[userToUnban]) {
      return await sock.sendMessage(from, {
        text: "ℹ️ User huyu bado hajabanwa.",
      });
    }

    delete banlist[userToUnban];
    saveBanlist();

    await sock.sendMessage(from, {
      text: `✅ User ${args[0]} ameondolewa kwenye banlist.`,
    });
  },
};
