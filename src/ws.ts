import WebSocket, { WebSocketServer } from 'ws';
// Minimal WS server skeleton; in production attach to HTTP server
let wss: WebSocketServer | null = null;

export function initWebsocket() {
  if (wss) return;
  wss = new WebSocketServer({ port: 4050 });
  wss.on('connection', (socket) => {
    socket.on('message', (msg) => {
      // echo or process subscribe messages
      // clients should send { type: 'subscribe', projectId: '...' }
      try {
        const data = JSON.parse(msg.toString());
        if (data.type === 'ping') socket.send(JSON.stringify({ type: 'pong' }));
      } catch (e) {}
    });
  });
  console.log('WebSocket server listening on port 4050');
}
