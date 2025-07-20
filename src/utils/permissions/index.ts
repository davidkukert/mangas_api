import {
	AbilityBuilder,
	type CreateAbility,
	createMongoAbility,
	type MongoAbility,
} from '@casl/ability'
import type { User } from '@db/schemas/User'
import { permissions } from '@utils/permissions/permissions'
import type { Role } from '@utils/permissions/roles'
import { allSubject } from '@utils/permissions/subjects/all'
import { authorSubject } from '@utils/permissions/subjects/author'
import { chapterSubject } from '@utils/permissions/subjects/chapter'
import { mangaSubject } from '@utils/permissions/subjects/manga'
import { tagSubject } from '@utils/permissions/subjects/tag'
import { userSubject } from '@utils/permissions/subjects/user'
import type { Static } from 'elysia'
import z from 'zod'

const appAbilitiesSchema = z.union([
	userSubject,
	allSubject,
	mangaSubject,
	authorSubject,
	tagSubject,
	chapterSubject,
])

export type AppAbilities = z.infer<typeof appAbilitiesSchema>
export type AppAbility = MongoAbility<AppAbilities>
export type UserAbility =
	| Static<typeof User>
	| {
			id?: string
			role: Role
	  }

export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: UserAbility) {
	const builder = new AbilityBuilder(createAppAbility)
	const userPermissions = permissions[user.role] ?? permissions.guest
	if (typeof userPermissions !== 'function') {
		throw new Error(`Invalid permissions for role: ${user.role}`)
	}
	userPermissions(user, builder)
	const ability = builder.build({
		detectSubjectType(subject) {
			return subject.__typename
		},
	})

	ability.can = ability.can.bind(ability)
	ability.cannot = ability.cannot.bind(ability)

	return ability
}
