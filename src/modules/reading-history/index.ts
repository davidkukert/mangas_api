import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import { ReadingHistoryModel } from './model'

export const readingHistory = new Elysia({
	name: 'Module.ReadingHistory',
	prefix: '/reading-history',
})
	.use(ReadingHistoryModel)
	.use(setup)
	.put(
		'/chapters/:chapterId',
		async ({ auth, db, query: { page }, params: { chapterId } }) => {
			await db.readingHistory.upsert({
				create: {
					chapterId,
					userId: auth.currentUser.id,
					page,
				},
				update: { page },
				where: {
					chapterId_userId: {
						chapterId,
						userId: auth.currentUser.id,
					},
				},
			})

			return {
				message: 'Capítulo adicionado com sucesso ao histórico de leitura!',
			}
		},
		{
			query: 'ReadingHistoryQueryRoute',
			privateRoute: true,
		},
	)
	.delete(
		'/chapters/:chapterId',
		async ({ auth, db, params: { chapterId } }) => {
			await db.readingHistory.delete({
				where: {
					chapterId_userId: {
						chapterId,
						userId: auth.currentUser.id,
					},
				},
			})

			return {
				message: 'Capítulo removido com sucesso do histórico de leitura!',
			}
		},
		{
			privateRoute: true,
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			let modelName = 'ReadingHistory'
			if (error.message.includes('chapter_id')) {
				modelName = 'Capítulo'
			} else if (error.message.includes('user_id')) {
				modelName = 'Usuário'
			}

			const { message, status } = handleError(error, 'ReadingHistory', {
				P2002: 'Capítulo já adicionado ao histórico de leitura!',
				P2003: `${modelName} não encontrado`,
				P2025: 'Capítulo não encontrado no histórico de leitura',
			})
			set.status = status
			return { message }
		}
	})
