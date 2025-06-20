const { db, saveDB } = require("../bdd");

module.exports = {
  name: "warn",
  description: "Mpa member warning (max 3)",
  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith("@g.us");

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: "⚠️ Amri hii inatumika tu kwenye magroup!",
      });
    }

    const mentionedJid = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

    if (!mentionedJid) {
      return await sock.sendMessage(from, {
        text: "⚠️ Tafadhali tag mtu unayemtaka kupewa warning. Mfano: !warn @user",
      });
    }

    // Tumia database kuweka warning
    db.users[mentionedJid] = db.users[mentionedJid] || { warned: 0 };
    db.users[mentionedJid].warned += 1;

    const warnedCount = db.users[mentionedJid].warned;

    saveDB(); // hifadhi kwenye file

    if (warnedCount >= 3) {
      await sock.groupParticipantsUpdate(from, [mentionedJid], "remove");
      await sock.sendMessage(from, {
        text: `🚫 ${mentionedJid} amepewa warning 3/3 na ametolewa group.`,
      });
    } else {
      await sock.sendMessage(from, {
        text: `⚠️ ${mentionedJid} amepewa warning ${warnedCount}/3`,
      });
    }
  },
};
