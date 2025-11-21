import z from "zod"

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Nome muito curto"),
        email: z.email("Email inválido"),
        password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
    }),
})

export const loginSchema = z.object({
    body: z.object({
        email: z.email("Email inválido"),
        password: z.string().min(6, "Senha inválida"),
    }),
})

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];