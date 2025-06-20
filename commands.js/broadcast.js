// 📁 commands/broadcast.js

module.exports = {
  name: "broadcast",
  execute: async (sock, msg, args) => {
    const sender = msg.key.participant || msg.key.remoteJid;
    const from = msg.key.remoteJid;

    const isPrivate = !from.endsWith("@g.us");
    const text = args.join(" ");

    if (!text) {
      return await sock.sendMessage(from, {
        text: "📢 Tumia kama hivi:\n!broadcast Hello watu wote!",
      });
    }

    // Ruhusu ni developer pekee au private chat
    const ownerNumber = "255763111390@s.whatsapp.net"; // 👈 Badilisha na namba yako kamili
    if (sender !== ownerNumber && !isPrivate) {
      return await sock.sendMessage(from, {
        text: "❌ Ni developer tu anayeweza kutumia hii command kwenye group.",
      });
    }

    try {
      const chats = await sock.groupFetchAllParticipating(); // groups
      const privateChats = await sock.chats.all(); // all chats incl. private

      const targets = [
        ...Object.keys(chats),
        ...privateChats.map((c) => c.id),
      ];

      const uniqueTargets = [...new Set(targets)];

      for (const jid of uniqueTargets) {
        await sock.sendMessage(jid, {
          text: `🗣 *Broadcast Message:*\n\n${text}`,
        });
        await new Promise((res) => setTimeout(res, 800)); // delay kidogo
      }

      await sock.sendMessage(from, {
        text: `✅ Ujumbe umetumwa kwa chats ${uniqueTargets.length}`,
      });
    } catch (err) {
      await sock.sendMessage(from, {
        text: "❌ Imeshindikana kutuma broadcast: " + err.message,
      });
    }
  },
};
