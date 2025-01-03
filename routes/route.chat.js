import { Router } from 'express'

import { ChatController } from '../controllers/chat/controller.chat.js'


export const createChatRouter = ({chatModel,configEnv,app,jwt,io}) =>{
    const chatRouter = Router();

    const chatController = new ChatController({chatModel,configEnv,app,jwt,io});
    
    chatRouter.get('/', chatController.create);
    
    //loginRouter.get('/:id', loginController.getById)


    return chatRouter;
}


