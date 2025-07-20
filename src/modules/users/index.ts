import { setup } from '@app/setup'
import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { UserModel } from './model'

export const users = new Elysia({ name: 'Module.Users', prefix: '/users' })
	.use(UserModel)
	.use(setup)
	.get('/', async ({ db }) => {
		const data = await db.user.findMany({ omit: { password: true } })
		return { data }
	})
	.get('/:id', async ({ db, params: { id } }) => {
		const data = await db.user.findUniqueOrThrow({
			where: { id },
			omit: { password: true },
		})
		return { data }
	})
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
			set.status = 201
			return { data }
		},
		{ body: 'user.create' },
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
		},
	)
	.delete('/:id', async ({ db, params: { id } }) => {
		await db.user.delete({ where: { id } })
		return { message: 'User deleted' }
	})
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'User', {})
			set.status = status
			return { message }
		}
	})
