import { setup } from '@app/setup'
import Elysia from 'elysia'
import { AuthModel } from './model'
import { AuthService } from './service'

export const auth = new Elysia({ name: 'Module.Auth', prefix: '/auth' })
	.use(setup)
	.use(AuthService)
	.use(AuthModel)
	.post(
		'/login',
		async ({ HttpError, body, db, auth: { genToken } }) => {
			const { username, password } = body
			const user = await db.user.findUnique({ where: { username } })
			if (!user || !Bun.password.verifySync(password, user.password)) {
				throw HttpError.Unauthorized()
			}

			const token = await genToken(user.id)

			return {
				token,
				type: 'Bearer',
			}
		},
		{
			body: 'auth.login',
		},
	)
	.get(
		'/me',
		({ auth: { currentUser } }) => {
			return { data: currentUser }
		},
		{ privateRoute: true },
	)
