import z from 'zod'

const envSchema = z.object({
	DATABASE_URL: z.url().min(1, 'DATABASE_URL is required'),
	JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
})

export const envVars = envSchema.parse(process.env)
