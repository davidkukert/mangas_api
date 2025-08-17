import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import { TagModel } from './model'

export default new Elysia({ prefix: '/tags' })
	.use(setup)
	.use(TagModel)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.tag.findMany()
			return { data }
		},
		{ response: 'TagListResponse', publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.tag.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{
			response: 'TagResponse',
			publicRoute: true,
		},
	)
	.post(
		'/',
		async ({ db, body, set }) => {
			const data = await db.tag.create({ data: body })
			set.status = 'Created'
			return { data }
		},
		{
			response: 'TagResponse',
			body: 'TagCreatePlainInput',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'create', 'Tag')
			},
		},
	)
	.put(
		'/:id',
		async ({ db, body, params: { id } }) => {
			const data = await db.tag.update({ where: { id }, data: body })
			return { data }
		},
		{
			response: 'TagResponse',
			body: 'TagUpdatePlainInput',
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
			return { message: 'Tag deletada com sucesso!' }
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
			const { message, status } = handleError(error, 'Tag')
			set.status = status
			return { message }
		}
	})
