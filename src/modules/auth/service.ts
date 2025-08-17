import type { CanParameters } from '@casl/ability'
import bearer from '@elysiajs/bearer'
import jwt from '@elysiajs/jwt'
import Elysia from 'elysia'
import { dbDecorator } from '@/db'
import { envVars } from '@/env'
import { errorsDecorator } from '@/errors'
import {
	type AppAbilities,
	defineAbilityFor,
	type UserAbility,
} from '@/utils/permissions'

export const AuthService = new Elysia({ name: 'auth-service' })
	.use(dbDecorator)
	.use(errorsDecorator)
	.use(bearer())
	.use(
		jwt({
			secret: envVars.JWT_SECRET,
		}),
	)
	.derive({ as: 'global' }, ({ bearer, db, jwt, HttpError }) => ({
		auth: {
			async genToken(userId: string) {
				const token = await jwt.sign({ sub: userId })
				return token
			},
			async getCurrentUser() {
				if (bearer) {
					const payload = await jwt.verify(bearer)
					if (payload && payload.sub !== undefined) {
						const user =
							(await db.user.findUnique({
								where: { id: payload.sub },
								omit: { password: true },
							})) ?? undefined
						return user
					}
				}

				return undefined
			},
			currentUser: { role: 'guest' } as UserAbility,
			authorization(user: UserAbility, ...args: CanParameters<AppAbilities>) {
				if (defineAbilityFor(user).cannot(...args)) {
					throw HttpError.Forbidden(
						'You are not allowed to perform this action',
					)
				}
			},
		},
	}))
	.macro({
		privateRoute: {
			resolve: async ({ auth, HttpError }) => {
				const currentUser = await auth.getCurrentUser()
				if (!currentUser) {
					throw HttpError.Unauthorized()
				}
				return {
					auth: {
						...auth,
						currentUser,
					},
				}
			},
		},
		publicRoute: {
			resolve: async ({ auth }) => {
				const currentUser: UserAbility =
					(await auth.getCurrentUser()) ?? auth.currentUser
				auth.authorization(currentUser, 'read', 'all')
				return {
					auth: {
						...auth,
						currentUser,
					},
				}
			},
		},
	})
