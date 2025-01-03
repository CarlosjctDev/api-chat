
import { Server } from 'socket.io';
import { createServer } from 'node:http'

export const socketIo =  ({app,json,jwt,configEnv}) =>{
    let {JWT_ACCESTOKEN_SECRET_KEY} =  configEnv;
    const server =  createServer(app);
    const io = new Server(server, {
        connectionStateRecovery: {}
    });

    // Middleware de socket.io para acceder a las cookies
    io.use((socket, next) => {        
        const access_token = socket.handshake.cookies.access_token;
    
        if (!access_token) {
            return next(new Error(json({error:"Verificar token"})));
        }
    
        // Verificar el token
        jwt.verify(access_token, JWT_ACCESTOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new Error(json({error:"Token expiró"})));
        }
    
        
        socket.username = decoded.username;
        socket.id = decoded.id;
        next();
        });
    });

    io.on('connection', async (socket) => {
        console.log('Cliente conectado:', socket.username);
        console.log('Cliente id conectado:', socket.id);
    
        socket.on('disconnect', () => {
            console.log('an user has disconnected')
        })
    
        socket.on('chat message', async (msg) => {
            const username = socket.username
            console.log({ username })
        
            io.emit('chat message', msg, "hola", username)
        })
    
        if (!socket.recovered) { // <- recuperase los mensajes sin conexión
        }
    })

    return [io,server];
}