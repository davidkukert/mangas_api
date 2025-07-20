import Elysia, { t } from 'elysia'
import { UserModel } from '../users/model'

export const AuthModel = new Elysia({ name: 'Model.Auth' })
	.use(UserModel)
	.model({
		'auth.login': t.Object({
			username: t.String(),
			password: t.String(),
		}),
	})
