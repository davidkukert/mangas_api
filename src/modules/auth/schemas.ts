import { t } from 'elysia'

export const AuthUserLoginSchema = t.Object({
	username: t.String(),
	password: t.String(),
})
