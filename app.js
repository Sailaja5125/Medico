import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import userrouter from './routers/user.routs.js';
import blogrouter from './routers/blog.router.js';
import shoprouter from './routers/product.router.js';
import orderrouter from './routers/order.router.js';
import cartrouter from './routers/cart.router.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend'));

app.use('/api/v1/users', userrouter);
app.use('/api/v1/blog', blogrouter);
app.use('/api/v1/shop', shoprouter);
app.use('/api/v1/order', orderrouter);
app.use('/api/v1/cart', cartrouter);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log('Message received:', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export { app }