import { validateLogin, validatePartialLogin } from "./schemas/schema.login.js";
import {verifyTurnstile} from "../../utils/verifyTurnstile.js"

export class LoginController {
  constructor ( {loginModel,configEnv, jwt,cookieSameSite}){
    this.loginModel = loginModel;
    this.configEnv = configEnv;
    this.jwt = jwt;
    this.cookieSameSite = cookieSameSite;
  }
  
  create = async  (req, res) => {
      const result = validateLogin(req.body);      
      const {
        JWT_ACCESTOKEN_SECRET_KEY,
        ENVIROMENT,
        JWT_REFRESHTOKEN_SECRET_KEY,
        TURNSTILE_SECRET_KEY,
        EXPIRATION_TIME_ACCESSTOKEN,
        EXPIRATION_TIME_REFRESHTOKEN,
        MAXAGE_ACCESS_TOKEN,
        MAXAGE_REFRESH_TOKEN
      } =  this.configEnv;
      const enviroment = ENVIROMENT.toLowerCase();
     

      const cookieValue = req.cookies['access_token'];
      console.log('Valor de miCookie:', cookieValue);
      
      if (!result.success) {
        return res.status(400).send(result.error.message)
      }
   
      const {tokenTurnstile} =req.body;
      const ip =  req.socket.remoteAddress  ;
      

      const resultVerificar = await verifyTurnstile({TURNSTILE_SECRET_KEY,tokenTurnstile,ip,res})
      
      if (!resultVerificar.success) {
        return res.status(400).json({
          message : "No pudimos verificar que no eres un bot. Por favor, intenta nuevamente.", 
          success: false });        
      }


  
      try{
        const user = await this.loginModel.create({ input: result.data });
        // Generar access token
        const access_token = this.jwt.sign(
          { id: user.id, username: user.username },
          JWT_ACCESTOKEN_SECRET_KEY,
          { expiresIn: EXPIRATION_TIME_ACCESSTOKEN }
        );

        // Generar refresh token
        const refresh_token = this.jwt.sign(
          { id: user.id },
          JWT_REFRESHTOKEN_SECRET_KEY, 
          { expiresIn: EXPIRATION_TIME_REFRESHTOKEN }
        );
        
        console.log({
          domain: 'localhost',
          httpOnly: true,
          secure: enviroment === 'production' ,
          maxAge: MAXAGE_REFRESH_TOKEN * 1, 
          sameSite : this.cookieSameSite,
        })
        res.cookie('access_token', access_token,{
          domain: 'localhost',
          httpOnly : true,
          secure: enviroment === 'production' , // la cookie requiere https
          sameSite : this.cookieSameSite, // strict : la cookie solo se puede acceder en el mismo dominio, None : de cualquiera
          maxAge: MAXAGE_ACCESS_TOKEN 
        }).cookie('refresh_token', refresh_token, {
          domain: 'localhost',
          httpOnly: true,
          secure: enviroment === 'production' ,
          maxAge: MAXAGE_REFRESH_TOKEN * 1, 
          sameSite : this.cookieSameSite,
        })
        .status(201).json({user})


      }catch (error){
        res.status(401).json({ message :"Error al intentar logear al usuario, intente mas tarde."});
      }


    }
  
  }