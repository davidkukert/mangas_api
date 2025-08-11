import { type Prisma, PrismaClient } from '@db/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import Elysia, { type StatusMap } from 'elysia'
import { envVars } from '@/env'

interface HandleErrorReturn {
	status: number | keyof StatusMap
	message: string
}

const adapter = new PrismaPg({
	connectionString: envVars.DATABASE_URL,
})

export const dbDecorator = new Elysia({ name: 'db-decorator' })
	.decorate('db', new PrismaClient({ adapter }))
	.decorate(
		'handleError',
		(
			error: Prisma.PrismaClientKnownRequestError,
			modelName: Prisma.ModelName,
			messages: Record<string, string> = {},
		): HandleErrorReturn => {
			switch (error.code) {
				case 'P2002':
					return {
						status: 'Conflict',
						message:
							messages.P2002 ??
							`${error.meta?.modelName ?? modelName ?? ''} already exists`,
					}

				case 'P2003':
					return {
						status: 'Not Found',
						message:
							messages.P2003 ??
							`${error.meta?.modelName ?? modelName ?? ''} not found`,
					}

				case 'P2011':
					return {
						status: 'Not Found',
						message:
							messages.P2011 ??
							`${error.meta?.modelName ?? modelName ?? ''} not found`,
					}

				case 'P2025':
					return {
						status: 'Not Found',
						message:
							messages.P2025 ??
							`${error.meta?.modelName ?? modelName ?? ''} not found`,
					}

				case 'ECONNREFUSED':
					return {
						status: 'Service Unavailable',
						message: 'Database connection refused',
					}
				default:
					return {
						status: 'Internal Server Error',
						message: 'Internal server error',
					}
			}
		},
	)
