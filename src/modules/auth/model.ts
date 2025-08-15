import Elysia from 'elysia'
import { AuthUserLoginSchema } from './schemas'

export const AuthModel = new Elysia({ name: 'auth-model' }).model({
	AuthUserLogin: AuthUserLoginSchema,
})
