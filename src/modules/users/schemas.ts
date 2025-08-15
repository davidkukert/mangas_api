import { UserRole } from '@db/prisma/enums'
import { type Static, t } from 'elysia'

export const UserRoleEnumSchema = t.Enum(UserRole)

export const UserCreatePlainInputSchema = t.Object(
	{
		username: t.String({ minLength: 3, maxLength: 20 }),
		email: t.String({ format: 'email' }),
		password: t.String({ minLength: 6 }),
	},
	{ additionalProperties: false },
)

export const UserUpdatePlainInputSchema = t.Partial(
	UserCreatePlainInputSchema,
	{ additionalProperties: false, minProperties: 1 },
)

export const UserPlain = t.Object(
	{
		id: t.String(),
		username: t.String(),
		email: t.String({ format: 'email' }),
		role: UserRoleEnumSchema,
		createdAt: t.Date(),
		updatedAt: t.Date(),
	},
	{ additionalProperties: false },
)

export const UserResponseSchema = t.Object(
	{
		data: UserPlain,
	},
	{ additionalProperties: false },
)

export const UserListResponseSchema = t.Object(
	{
		data: t.Array(UserPlain),
	},
	{ additionalProperties: false },
)

export type UserPlain = Static<typeof UserPlain>
