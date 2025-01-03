export const verifyTurnstile = async ({TURNSTILE_SECRET_KEY,ip,tokenTurnstile, res}) =>{
    if(!TURNSTILE_SECRET_KEY || !ip ){
        return res.status(400).json({ message : "Revisar estos parametros TURNSTILE O IP "});
      }
      // Validate the token by calling the
      // "/siteverify" API endpoint.
      let formData = new FormData();
      formData.append("secret", TURNSTILE_SECRET_KEY);
      formData.append("response", tokenTurnstile);
      formData.append("remoteip", ip);
    
      const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
      const resultVerificar = await fetch(url, {
        body: formData,
        method: "POST",
      });
    
      const result = await resultVerificar.json();
      return result;
}