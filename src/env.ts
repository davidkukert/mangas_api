import z from 'zod'

const envSchema = z.object({
	DATABASE_URL: z.url().min(1, 'DATABASE_URL is required'),
})

export const envVars = envSchema.parse(process.env)
