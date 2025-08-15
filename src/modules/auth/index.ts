import Elysia from 'elysia'
import { setup } from '@/setup'
import { AuthModel } from './model'
import { AuthService } from './service'

export default new Elysia({ prefix: '/auth' })
	.use(setup)
	.use(AuthService)
	.use(AuthModel)
	.post(
		'/login',
		async ({ body, db, auth: { genToken }, set }) => {
			const { username, password } = body
			const user = await db.user.findUnique({ where: { username } })
			if (!user || !Bun.password.verifySync(password, user.password)) {
				set.status = 'Unauthorized'
				throw new Error('Unauthorized')
			}

			const token = await genToken(user.id)

			return {
				token,
				type: 'Bearer',
			}
		},
		{
			body: 'AuthUserLogin',
		},
	)
	.get(
		'/me',
		({ auth: { currentUser } }) => {
			return { data: currentUser }
		},
		{ privateRoute: true },
	)
