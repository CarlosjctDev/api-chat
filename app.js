import {envConfig} from './utils/envConfig.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; 
import express, {json} from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import {socketIo} from './utils/io.js';

import { createLoginRouter } from './routes/route.login.js';
import { createChatRouter } from './routes/route.chat.js';

import logger from 'morgan';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CreateApp =  ({loginModel,chatModel},{cookieSameSite}) =>{
    const configEnv = envConfig();
    const app = express();   
    app.use(json());// Middleware para parsear JSON
    app.disable('x-powered-by');
    app.use(corsMiddleware());// Habilita CORS
    app.use(cookieParser());
    //SOCKET IO
    const [io,server] =  socketIo({app,json,jwt,configEnv});

    app.use('/api/login', createLoginRouter({loginModel,configEnv,jwt,cookieSameSite}));
    app.use('/api/chat', createChatRouter({chatModel,configEnv,app,jwt,io}));

    const frontendPath = path.join(__dirname, 'frontend/dist'); // Ruta de tu aplicación frontend construida
    app.use('/', express.static(frontendPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
    

    // Middleware para manejar rutas no encontradas
    app.use((req, res, next) => {
        res.status(404).json({ error: 'Ruta no encontrada' });
    });

    app.use((err, req, res, next) => {//MANEJO DE ERRORES GLOBALES
        console.error(err.stack);
        res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
    });

    const PORT = configEnv.PORT || 8080;    
    app.use(logger('dev'))    

    server.listen(PORT,  () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });

}

