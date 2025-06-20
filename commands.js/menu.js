// 📁 menu.js

function listMenu() {
  return `
*📖 Zokou Command Menu*

📌 Basic
- !ping → Test kama bot iko live
- !help → Maelezo ya commands

👥 Group
- !group open|close → Fungua/Funga group
- !kick @user → Ondoa member

🔽 Download
- !ytmp3 <link> → Pakua audio
- !ytmp4 <link> → Pakua video

📖 Religion
- !quran <sura aya> → Aya ya Quran
- !bible <kitabu> <sura>:<aya> → Biblia verse

🤖 Chatbot
- !ask <swali> → Uliza AI

🔧 Admin Tools
- (Coming soon)

*Zokou Bot | WhatsApp Assistant 🔥*
  `;
}

module.exports = { listMenu };
