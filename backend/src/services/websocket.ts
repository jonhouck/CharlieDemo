import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

let wss: WebSocketServer;

export const setupWebSocket = (server: Server) => {
    wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('New WebSocket connection');

        ws.on('close', () => {
            console.log('WebSocket disconnected');
        });
    });
};

export const broadcast = (data: any) => {
    if (!wss) return;

    const message = JSON.stringify(data);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};
