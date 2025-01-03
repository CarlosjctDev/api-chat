

export class ChatController {
  constructor ( {loginModel,configEnv,app,jwt,io}){
    this.loginModel = loginModel;
    this.configEnv = configEnv;
    this.app = app;
    this.jwt = jwt;
    this.io = io;
  }
  
  create = async  (req, res) => {
     const  access_token =  req.cookies.access_token;
     let {JWT_ACCESTOKEN_SECRET_KEY} =  this.configEnv;

     if(!access_token){
        return res.status(403).json({message:"Verificar token"})
     } 

     try{
        const data = this.jwt.verify(access_token,JWT_ACCESTOKEN_SECRET_KEY);        
     }catch{
        return res.status(401).json({message:"Token expiró"})
     }
   

    }
  
  }