import { setup } from '@app/setup'
import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { ChapterModel } from './model'

export const chapters = new Elysia({
	name: 'Module.Chapters',
	prefix: '/chapters',
})
	.use(ChapterModel)
	.use(setup)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.chapter.findMany()
			return { data }
		},
		{ publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.chapter.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{ publicRoute: true },
	)
	.post(
		'/',
		async ({ body, db, set }) => {
			const data = await db.chapter.create({ data: body })
			set.status = 'Created'
			return { data }
		},
		{
			body: 'chapter.create',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'create', 'Chapter')
			},
		},
	)
	.put(
		'/:id',
		async ({ body, db, params: { id } }) => {
			const data = await db.chapter.update({ where: { id }, data: body })
			return { data }
		},
		{
			body: 'chapter.update',
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
			return { message: 'Chapter deleted' }
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
			const { message, status } = handleError(error, 'Chapter', {
				P2003: 'Manga this chapter not found',
			})
			set.status = status
			return { message }
		}
	})
