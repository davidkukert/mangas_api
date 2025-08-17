import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import { ChapterModel } from './model'

export default new Elysia({ prefix: '/chapters' })
	.use(setup)
	.use(ChapterModel)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.chapter.findMany()
			return { data }
		},
		{ response: 'ChapterListResponse', publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.chapter.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{
			response: 'ChapterResponse',
			publicRoute: true,
		},
	)
	.post(
		'/',
		async ({ db, body, set }) => {
			const data = await db.chapter.create({ data: body })
			set.status = 'Created'
			return { data }
		},
		{
			response: 'ChapterResponse',
			body: 'ChapterCreatePlainInput',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'create', 'Chapter')
			},
		},
	)
	.put(
		'/:id',
		async ({ db, body, params: { id } }) => {
			const data = await db.chapter.update({ where: { id }, data: body })
			return { data }
		},
		{
			response: 'ChapterResponse',
			body: 'ChapterUpdatePlainInput',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'update', 'Chapter')
			},
		},
	)
	.delete(
		'/:id',
		async ({ db, params: { id } }) => {
			await db.chapter.delete({ where: { id } })
			return { message: 'Capítulo deletado com sucesso!' }
		},
		{
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'delete', 'Chapter')
			},
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'Chapter')
			set.status = status
			return { message }
		}
	})
