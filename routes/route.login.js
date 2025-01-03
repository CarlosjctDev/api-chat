import { Router } from 'express';

import { LoginController } from '../controllers/login/controller.login.js'


export const createLoginRouter = ({loginModel,configEnv,jwt,cookieSameSite}) =>{
    const loginRouter = Router()
    const loginController = new LoginController({loginModel,configEnv,jwt,cookieSameSite})
    
    loginRouter.post('/', loginController.create)
    
    //loginRouter.get('/:id', loginController.getById)


    return loginRouter
}

