const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const MY_PUBLIC_URL = process.env.RENDER_EXTERNAL_URL; 

// Base route to pass Render's platform check
app.get('/', (req, res) => {
    res.send('WhatsApp Divert Bot is Online and Operating 24/7.');
});

app.listen(PORT, () => console.log(`Server handling port ${PORT}`));

// --- SERVER KEEP-ALIVE ROUTINE ---
if (MY_PUBLIC_URL) {
    setInterval(async () => {
        try {
            await axios.get(MY_PUBLIC_URL);
            console.log('Keep-alive ping sent successfully.');
        } catch (err) {
            console.error('Keep-alive tick failed:', err.message);
        }
    }, 10 * 60 * 1000); // Trigger every 10 minutes
}

// --- WHATSAPP BOT BOT ROUTINE ---
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

// Logs QR terminal string inside Render Dashboard logs
client.on('qr', (qr) => {
    console.log('SCAN THIS QR CODE IN YOUR PHONE APP NOW:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Bot is linked to your WhatsApp cluster!');
    try {
        await client.sendPresenceUnavailable(); // Set global status to Offline
    } catch (e) { console.error('Error locking status:', e); }
});

client.on('message', async (msg) => {
    // Drop execution loops if incoming ping is from group chat or standard statuses
    if (msg.isGroupMsg || msg.from === 'status@broadcast') return;

    // TODO: Customize with your unique Signal profile link
    const signalLink = process.env.SIGNAL_LINK || "https://signal.me";
    const templateMessage = `🚨 [Offline Notice]\nI have left WhatsApp. Please drop your message over on Signal:\n👉 ${signalLink}`;

    try {
        await client.sendMessage(msg.from, templateMessage);
        await client.sendPresenceUnavailable(); // Re-lock status as Offline
    } catch (err) {
        console.error('Failure forwarding notification message:', err);
    }
});

client.initialize();
