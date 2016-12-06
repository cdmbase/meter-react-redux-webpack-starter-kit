import SocketIoClient from 'socket.io-client';

const connection = SocketIoClient.connect(Meteor.settings.public.io);
export default connection;
