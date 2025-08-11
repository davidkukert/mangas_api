import { Prisma } from '@db/prisma/client'
import Elysia from 'elysia'
import { setup } from '@/setup'
import { UserModel } from './model'

export default new Elysia({ prefix: '/users' })
	.use(setup)
	.use(UserModel)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.user.findMany({ omit: { password: true } })
			return { data }
		},
		{ response: 'UserListResponse' },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.user.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{
			response: 'UserResponse',
		},
	)
	.post(
		'/',
		async ({ db, body, set }) => {
			const { username, email, password } = body
			const data = await db.user.create({
				data: {
					username,
					email,
					password: Bun.password.hashSync(password),
				},
				omit: { password: true },
			})

			set.status = 'Created'
			return { data }
		},
		{
			body: 'UserCreateInput',
			response: 'UserResponse',
		},
	)
	.put(
		'/:id',
		async ({ db, body, params: { id } }) => {
			const { username, email, password } = body
			const data = await db.user.update({
				where: { id },
				data: {
					username,
					email,
					password: password ? Bun.password.hashSync(password) : undefined,
				},
				omit: { password: true },
			})

			return { data }
		},
		{
			body: 'UserUpdateInput',
			response: 'UserResponse',
		},
	)
	.delete('/:id', async ({ db, params: { id } }) => {
		await db.user.delete({ where: { id } })
		return { message: 'Usuário deletado com sucesso!' }
	})
	.onError(({ error, handleError, set }) => {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const { message, status } = handleError(error, 'User')
			set.status = status
			return { message }
		}
	})
