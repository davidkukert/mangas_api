import { setup } from '@app/setup'
import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { TagModel } from './model'

export const tags = new Elysia({
	name: 'Module.Tags',
	prefix: '/tags',
})
	.use(TagModel)
	.use(setup)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.tag.findMany()
			return { data }
		},
		{ publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.tag.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{ publicRoute: true },
	)
	.post(
		'/',
		async ({ body, db, set }) => {
			const data = await db.tag.create({ data: body })
			set.status = 201
			return { data }
		},
		{
			body: 'tag.create',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'create', 'Tag')
			},
		},
	)
	.put(
		'/:id',
		async ({ body, db, params: { id } }) => {
			const data = await db.tag.update({ where: { id }, data: body })
			return { data }
		},
		{
			body: 'tag.update',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'update', 'Tag')
			},
		},
	)
	.delete(
		'/:id',
		async ({ db, params: { id } }) => {
			await db.tag.delete({ where: { id } })
			return { message: 'Tag deleted' }
		},
		{
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'delete', 'Tag')
			},
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'Tag', {})
			set.status = status
			return { message }
		}
	})
