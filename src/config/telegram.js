const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/firebase-adminsdk.json');
let {telegramUserId} = require("./firebase");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-database-name.firebaseio.com'
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = '7017482067:AAFXPDlGgfFex5jE6BH07x_ks34jXFtUB38';

app.use(bodyParser.json());

// Telegram webhook endpoint
app.post(`/webhook/${TELEGRAM_TOKEN}`, async (req, res) => {
    const { message } = req.body;

    if (message && message.text) {
        const chatId = message.chat.id;
        const userId = message.from.id;
        const userName = message.from.username;

        if (message.text === '/start') {
            await sendMessage(chatId, `Welcome, ${userName}!.`);

            const userRef = db.collection('users').doc(userId.toString());
            await userRef.set({ telegramId: userId, userName }, { merge: true });

            telegramUserId = userId+userName;

            console.log(`User ${userName} started the bot. Telegram ID: ${userId}`);
        }
    }

    res.sendStatus(200);
});

const sendMessage = async (chatId, text) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
    });
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});