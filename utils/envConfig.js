const {
    PORT = 8080,
    TURNSTILE_SECRET_KEY ,
    JWT_ACCESTOKEN_SECRET_KEY ,
    ENVIROMENT,
    JWT_REFRESHTOKEN_SECRET_KEY,
    EXPIRATION_TIME_ACCESSTOKEN,
    EXPIRATION_TIME_REFRESHTOKEN,
    MAXAGE_ACCESS_TOKEN,
    MAXAGE_REFRESH_TOKEN
} =  process.env;

export const  envConfig =  () =>({
    PORT : PORT ,
    TURNSTILE_SECRET_KEY:TURNSTILE_SECRET_KEY,
    JWT_ACCESTOKEN_SECRET_KEY : JWT_ACCESTOKEN_SECRET_KEY,
    JWT_REFRESHTOKEN_SECRET_KEY:JWT_REFRESHTOKEN_SECRET_KEY,
    ENVIROMENT : ENVIROMENT,
    EXPIRATION_TIME_ACCESSTOKEN: EXPIRATION_TIME_ACCESSTOKEN,
    EXPIRATION_TIME_REFRESHTOKEN : EXPIRATION_TIME_REFRESHTOKEN,
    MAXAGE_ACCESS_TOKEN: MAXAGE_ACCESS_TOKEN,
    MAXAGE_REFRESH_TOKEN: MAXAGE_REFRESH_TOKEN
    });
