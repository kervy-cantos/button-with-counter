const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: '*'
	}
});
let count = 0;

io.on('connection', socket => {
	socket.emit('updateCount', count);

	socket.on('increment', () => {
		count++;
		io.emit('updateCount', count);
	});
});

app.get('getCount', (req, res) => {
	res.json({ count });
});

app.post('/increment', (req, res) => {
	count++;
	io.emit('updateCount', count);
	res.json({ count });
});

server.listen(5000, () => {
	console.log('server');
});
