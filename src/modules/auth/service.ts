import { envVars } from '@app/env'
import type { CanParameters } from '@casl/ability'
import { prismaDecorator } from '@db'
import bearer from '@elysiajs/bearer'
import jwt from '@elysiajs/jwt'
import {
	type AppAbilities,
	defineAbilityFor,
	type UserAbility,
} from '@utils/permissions'
import Elysia from 'elysia'
import { httpErrorDecorator } from 'elysia-http-error'

export const AuthService = new Elysia({ name: 'Service.Auth' })
	.use(prismaDecorator)
	.use(httpErrorDecorator)
	.use(bearer())
	.use(
		jwt({
			secret: envVars.JWT_SECRET,
		}),
	)
	.derive({ as: 'global' }, ({ HttpError, bearer, db, jwt }) => ({
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
			resolve: async ({ HttpError, auth }) => {
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
