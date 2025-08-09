import { setup } from '@app/setup'
import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { UserModel } from './model'

export const users = new Elysia({ name: 'Module.Users', prefix: '/users' })
	.use(UserModel)
	.use(setup)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.user.findMany({ omit: { password: true } })
			return { data }
		},
		{ publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.user.findUniqueOrThrow({
				where: { id },
				omit: { password: true },
			})
			return { data }
		},
		{ publicRoute: true },
	)
	.post(
		'/',
		async ({ db, body, set }) => {
			const data = await db.user.create({
				data: {
					...body,
					password: await Bun.password.hash(body.password),
				},
				omit: { password: true },
			})
			set.status = 'Created'
			return { data }
		},
		{ body: 'user.create', publicRoute: true },
	)
	.put(
		'/:id',
		async ({ db, body, params: { id } }) => {
			const data = await db.user.update({
				where: { id },
				data: { ...body },
				omit: { password: true },
			})

			return { data }
		},
		{
			body: 'user.update',
			privateRoute: true,
			async beforeHandle({ auth, db, params: { id } }) {
				const user = await db.user.findUniqueOrThrow({ where: { id } })
				auth.authorization(auth.currentUser, 'update', {
					__typename: 'User',
					id: user.id,
					role: user.role,
				})
			},
		},
	)
	.delete(
		'/:id',
		async ({ db, params: { id } }) => {
			await db.user.delete({ where: { id } })
			return { message: 'User deleted' }
		},
		{
			privateRoute: true,
			async beforeHandle({ auth, db, params: { id } }) {
				const user = await db.user.findUniqueOrThrow({ where: { id } })
				auth.authorization(auth.currentUser, 'delete', {
					__typename: 'User',
					id: user.id,
					role: user.role,
				})
			},
		},
	)
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'User', {})
			set.status = status
			return { message }
		}
	})
