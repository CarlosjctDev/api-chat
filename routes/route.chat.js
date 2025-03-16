import { Router } from 'express'
import { ChatController } from '../controllers/chat/controller.chat.js'
const serverAddress = process.env.SERVER_ADDRESS;

export const createChatRouter = ({chatModel,configEnv,app,jwt,io}) =>{
    const chatRouter = Router();

    const chatController = new ChatController({chatModel,configEnv,app,jwt,io});
    
    chatRouter.get('/', chatController.create);
    
    chatRouter.post('/', async (req, res) => {
        try {
            // URL del servidor HTTP
            const externalUrl = `http://${serverAddress}/ItSolution/Fase3?opc=usuario&opc_sql=u_siau_pqr_fechas_min_max&c_user=1&empresas_disponibles=1,2,4,5,10,12`;
            console.log("EXTERNAL DATA");
            // Configuración de la solicitud
            const response = await fetch(externalUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json' // Asegura que la API responda en JSON
                }
            });

            if (!response.ok) {
                throw new Error(`Error en la API externa: ${response.status} - ${response.statusText}`);
            }
            
            const externalData = await response.json(); // Suponiendo que la respuesta es JSON
            
            console.log(externalData)

            // Crear objeto de chat combinando el mensaje con la respuesta externa
            const newChat = {
                id: Date.now(),
                externalData // Datos obtenidos del servidor HTTP
            };

            res.status(201).json(newChat);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });


    return chatRouter;
}


