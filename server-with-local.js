import { CreateApp } from "./app.js";
import {LoginModel } from "./models/local-system/login/model.login.js";
import {ChatModel } from "./models/local-system/chat/model.chat.js";


CreateApp({
    loginModel : LoginModel, 
    chatModel  : ChatModel
},{cookieSameSite:"None"}); // strict : la cookie solo se puede acceder en el mismo dominio, None : de cualquiera