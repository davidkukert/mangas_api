import { setup } from '@app/setup'
import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { ReadingHistoryModel } from './model'

export const readingHistory = new Elysia({
	name: 'Module.ReadingHistory',
	prefix: '/reading-history',
})
	.use(ReadingHistoryModel)
	.use(setup)
	.put(
		'/chapters/:chapterId',
		async ({
			auth: { currentUser },
			db,
			query: { page },
			params: { chapterId },
		}) => {
			await db.readingHistory.upsert({
				create: { chapterId, userId: currentUser.id, page },
				update: { page },
				where: {
					chapterId_userId: { chapterId, userId: currentUser.id },
				},
			})

			return { success: true }
		},
		{
			query: 'reading.history.attrs',
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'add_reading_history', 'Chapter')
			},
		},
	)
	.delete(
		'/chapters/:chapterId',
		async ({ auth: { currentUser }, db, params: { chapterId } }) => {
			await db.readingHistory.delete({
				where: {
					chapterId_userId: {
						chapterId,
						userId: currentUser.id,
					},
				},
			})

			return { success: true }
		},
		{
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'remove_reading_history', 'Chapter')
			},
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			let modelName: Prisma.ModelName = 'ReadingHistory'
			if (error.message.includes('chapter_id')) {
				modelName = 'Chapter'
			} else if (error.message.includes('user_id')) {
				modelName = 'User'
			}

			const { message, status } = handleError(error, 'ReadingHistory', {
				P2002: 'Chapter already added to reading history',
				P2003: `${modelName} not found`,
				P2025: 'Chapter not found in reading history',
			})
			set.status = status
			return { message }
		}
	})
