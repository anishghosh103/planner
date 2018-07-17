const socket = require('socket.io');

const eventEmitter = require('./_event-emitter');
const scheduler = require('./_scheduler');

module.exports = (server) => {
  const io = socket(server);
  let connectionCount = 0;
  io.on('connection', (socket) => {
    console.log('SocketIO.Connection', `${++connectionCount} connections`);

    socket.on('set-user', userId => {
      console.log('_socket.js', 'setting-user', userId);
      socket.user = userId;
    });

    eventEmitter.on('notification', notification => {
      if (socket.user && socket.user === notification.userId) {
        socket.emit('notification', notification);
      }
    });

    eventEmitter.on('reminder', meeting => {
      if (socket.user && socket.user === meeting.userId) {
        socket.emit('reminder', meeting);
      }
    });

    socket.on('snooze', meeting => {
      scheduler.snooze(meeting);
    });

    eventEmitter.on('logout', userId => {
      socket.emit('logout', userId);
    });

    socket.on('disconnect', () => {
      console.log('SocketIO.Disconnection', `${--connectionCount} connections.`);
    });
  });
};