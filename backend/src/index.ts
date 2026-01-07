import http from 'http';
import app from './app';
import { setupWebSocket } from './services/websocket';
import { startSimulation } from './services/simulator';

const PORT = 4000;

const server = http.createServer(app);

// Setup WebSocket
setupWebSocket(server);

// Start Simulation
startSimulation();

server.listen(PORT, () => {
    console.log(`Mock API running on http://localhost:${PORT}`);
    console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
