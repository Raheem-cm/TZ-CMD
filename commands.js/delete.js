// 📁 commands/delete.js

module.exports = {
  name: "delete",
  execute: async (sock, msg, args) => {
    const jid = msg.key.remoteJid;

    // Check kama ni reply
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.stanzaId;

    if (!quoted) {
      return await sock.sendMessage(jid, {
        text: "⚠️ Tafadhali reply kwenye meseji ya bot unayotaka ifutwe kwa kutumia:\n!delete",
      });
    }

    try {
      const participant = msg.message.extendedTextMessage.contextInfo.participant;
      const messageId = msg.message.extendedTextMessage.contextInfo.stanzaId;

      await sock.sendMessage(jid, {
        delete: {
          remoteJid: jid,
          fromMe: true,
          id: messageId,
          participant: participant,
        },
      });

    } catch (err) {
      await sock.sendMessage(jid, {
        text: "❌ Haikuweza kufutwa. Labda sio meseji ya bot.",
      });
    }
  },
};
