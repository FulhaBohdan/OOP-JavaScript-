const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

let sseClients = [];

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
    sseClients.push(newClient);

    req.on('close', () => {
        sseClients = sseClients.filter(c => c.id !== clientId);
    });
});

app.post('/send-message', (req, res) => {
    const { username, text } = req.body;
    
    const messageData = {
        username,
        text,
        time: new Date().toLocaleTimeString()
    };

    sseClients.forEach(client => {
        client.res.write(`data: ${JSON.stringify(messageData)}\n\n`);
    });

    res.status(200).send({ success: true });
});

let cryptoPrice = 100;

setInterval(() => {
    const change = (Math.random() * 10) - 5;
    cryptoPrice = Math.max(0.1, cryptoPrice + change);

    const updateMsg = JSON.stringify({ type: 'price_update', price: cryptoPrice.toFixed(2) });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(updateMsg);
        }
    });
}, 3000);

wss.on('connection', (ws) => {
    let userBalance = {
        usd: 1000,
        crypto: 0
    };

    ws.send(JSON.stringify({ type: 'balance_update', data: userBalance }));
    ws.send(JSON.stringify({ type: 'price_update', price: cryptoPrice.toFixed(2) }));

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === 'buy') {
            if (userBalance.usd >= cryptoPrice) {
                userBalance.usd -= cryptoPrice;
                userBalance.crypto += 1;
            }
        } else if (parsedMessage.type === 'sell') {
            if (userBalance.crypto >= 1) {
                userBalance.crypto -= 1;
                userBalance.usd += cryptoPrice;
            }
        }

        ws.send(JSON.stringify({ type: 'balance_update', data: userBalance }));
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});