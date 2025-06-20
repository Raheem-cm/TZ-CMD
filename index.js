const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys')
const { state, saveState } = useSingleFileAuthState('./auth_info.json')

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  })

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
      console.log('Connection closed due to ', lastDisconnect.error, ', reconnecting:', shouldReconnect)
      if (shouldReconnect) {
        startBot()
      }
    } else if (connection === 'open') {
      console.log('Connected to WhatsApp')
    }
  })

  sock.ev.on('creds.update', saveState)

  // Add more event handlers for messages etc here
}

startBot()
