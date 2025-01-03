import z from 'zod'

const loginSchema = z.object({
    tokenTurnstile: z.string({
      required_error: "El token Turnstile es obligatorio.",
      invalid_type_error: "El token Turnstile debe ser una cadena.",
    }).trim().min(1, { message: "El token Turnstile no puede estar vacío." }),
    
    nick: z.string()
    .trim()
    .min(1, { message: "El nick no puede estar vacio." }),
  });

export function validateLogin (input) {
  return loginSchema.safeParse(input)
}

export function validatePartialLogin (input) {
  return loginSchema.partial().safeParse(input)
}