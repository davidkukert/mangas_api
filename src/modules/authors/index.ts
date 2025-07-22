import { setup } from '@app/setup'
import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { AuthorModel } from './model'

export const authors = new Elysia({
	name: 'Module.Authors',
	prefix: '/authors',
})
	.use(AuthorModel)
	.use(setup)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.author.findMany()
			return { data }
		},
		{ publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.author.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{ publicRoute: true },
	)
	.post(
		'/',
		async ({ body, db, set }) => {
			const data = await db.author.create({ data: body })
			set.status = 201
			return { data }
		},
		{
			body: 'author.create',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'create', 'Author')
			},
		},
	)
	.put(
		'/:id',
		async ({ body, db, params: { id } }) => {
			const data = await db.author.update({ where: { id }, data: body })
			return { data }
		},
		{
			body: 'author.update',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'update', 'Author')
			},
		},
	)
	.delete(
		'/:id',
		async ({ db, params: { id } }) => {
			await db.author.delete({ where: { id } })
			return { message: 'Author deleted' }
		},
		{
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'delete', 'Author')
			},
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'Author', {})
			set.status = status
			return { message }
		}
	})
