import { envVars } from '@app/env'
import { type Prisma, PrismaClient } from '@db/prisma/client'
import {
	PrismaClientKnownRequestError,
	PrismaClientUnknownRequestError,
} from '@db/prisma/internal/prismaNamespace'
import { PrismaPg } from '@prisma/adapter-pg'
import Elysia from 'elysia'

const adapter = new PrismaPg({
	connectionString: envVars.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

export const prismaDecorator = new Elysia({
	name: 'Decorator.Prisma',
})
	.decorate({
		db: prisma,
		handleError(
			error: PrismaClientKnownRequestError,
			modelName: Prisma.ModelName,
			messages: Record<string, string>,
		) {
			switch (error.code) {
				case 'P2002':
					return {
						status: 409,
						message:
							messages.P2002 ??
							`${error.meta?.modelName ?? modelName ?? ''} already exists`,
					}

				case 'P2003':
					return {
						status: 404,
						message:
							messages.P2003 ??
							`${error.meta?.modelName ?? modelName ?? ''} not found`,
					}

				case 'P2011':
					return {
						status: 404,
						message:
							messages.P2003 ??
							`${error.meta?.modelName ?? modelName ?? ''} not found`,
					}

				case 'P2025':
					return {
						status: 404,
						message:
							messages.P2025 ??
							`${error.meta?.modelName ?? modelName ?? ''} not found`,
					}

				case 'ECONNREFUSED':
					return {
						status: 503,
						message: 'Database connection refused',
					}
				default:
					return {
						status: 500,
						message: 'Internal server error',
					}
			}
		},
	})
	.error({
		PrismaClientUnknownRequestError,
		ECONNREFUSED: PrismaClientKnownRequestError,
		P2002: PrismaClientKnownRequestError,
		P2003: PrismaClientKnownRequestError,
		P2004: PrismaClientKnownRequestError,
		P2005: PrismaClientKnownRequestError,
		P2006: PrismaClientKnownRequestError,
		P2011: PrismaClientKnownRequestError,
		P2025: PrismaClientKnownRequestError,
		P2026: PrismaClientKnownRequestError,
	})
