import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import { AuthorModel } from './model'
import type { AuthorListResponse, AuthorResponse } from './schemas'

export default new Elysia({ prefix: '/authors' })
	.use(setup)
	.use(AuthorModel)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.author.findMany()
			return { data } as AuthorListResponse
		},
		{ response: 'AuthorListResponse', publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.author.findUniqueOrThrow({ where: { id } })
			return { data } as AuthorResponse
		},
		{
			response: 'AuthorResponse',
			publicRoute: true,
		},
	)
	.post(
		'/',
		async ({ db, body, set }) => {
			const data = await db.author.create({ data: body })
			set.status = 'Created'
			return { data } as AuthorResponse
		},
		{
			response: 'AuthorResponse',
			body: 'AuthorCreatePlainInput',
			privateRoute: true,
			beforeHandle({ auth }) {
				auth.authorization(auth.currentUser, 'create', 'Author')
			},
		},
	)
	.put(
		'/:id',
		async ({ db, body, params: { id } }) => {
			const data = await db.author.update({ where: { id }, data: body })
			return { data } as AuthorResponse
		},
		{
			response: 'AuthorResponse',
			body: 'AuthorUpdatePlainInput',
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
			return { message: 'Autor deletado com sucesso!' }
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
			const { message, status } = handleError(error, 'Author')
			set.status = status
			return { message }
		}
	})
