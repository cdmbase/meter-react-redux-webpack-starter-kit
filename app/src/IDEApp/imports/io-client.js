import SocketIoClient from 'socket.io-client';


export let connection = SocketIoClient.connect(Meteor.settings.public.io);

export default connection;
