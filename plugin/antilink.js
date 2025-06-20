// 📁 plugins/antilink.js

const fs = require("fs");

const configFile = "./antilink.json";

// Soma settings
let settings = {};
if (fs.existsSync(configFile)) {
  settings = JSON.parse(fs.readFileSync(configFile));
}

// Cheki kama antilink imewashwa kwa group
function isAntilinkOn(groupId) {
  return settings[groupId] === true;
}

// Save settings
function saveSettings() {
  fs.writeFileSync(configFile, JSON.stringify(settings, null, 2));
}

// Process message
async function handleAntilink(sock, msg) {
  const from = msg.key.remoteJid;

  // Ikiwa sio group
  if (!from.endsWith("@g.us")) return;

  if (!isAntilinkOn(from)) return;

  const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";

  // Angalia kama ni WhatsApp link
  if (text.match(/chat\.whatsapp\.com\/[A-Za-z0-9]{20,24}/)) {
    const sender = msg.key.participant || msg.key.remoteJid;

    try {
      await sock.sendMessage(from, {
        text: `🚫 *Link ya WhatsApp group imetumwa na ${sender.split("@")[0]}* - inafukuzwa...`,
      });
      await sock.groupParticipantsUpdate(from, [sender], "remove");
    } catch (err) {
      await sock.sendMessage(from, { text: "❌ Error kuwatoa member: " + err.message });
    }
  }
}

// Toggle command
async function toggleAntilink(sock, msg, args) {
  const from = msg.key.remoteJid;
  const isOn = args[0]?.toLowerCase() === "on";

  settings[from] = isOn;
  saveSettings();

  await sock.sendMessage(from, {
    text: isOn
      ? "✅ Antilink imewashwa. Link za WhatsApp group sasa zitazuiwa."
      : "🚫 Antilink imezimwa. Watu wanaweza tuma link tena.",
  });
}

module.exports = { handleAntilink, toggleAntilink };
