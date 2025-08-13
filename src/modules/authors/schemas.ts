import { type Static, t } from 'elysia'

export const AuthorCreatePlainInputSchema = t.Object(
	{
		name: t.String(),
		biography: t.Optional(t.String()),
		socialLinks: t.Optional(t.Record(t.String(), t.String({ format: 'uri' }))),
		userId: t.Optional(t.String()),
	},
	{ additionalProperties: false },
)

export const AuthorUpdatePlainInputSchema = t.Partial(
	AuthorCreatePlainInputSchema,
	{
		additionalProperties: false,
		minProperties: 1,
	},
)

export const AuthorPlain = t.Object({
	id: t.String(),
	name: t.String(),
	biography: t.Nullable(t.String()),
	socialLinks: t.Nullable(t.Record(t.String(), t.String({ format: 'uri' }))),
	userId: t.Nullable(t.String()),
	createdAt: t.Date(),
	updatedAt: t.Date(),
})

export const AuthorResponseSchema = t.Object(
	{
		data: AuthorPlain,
	},
	{ additionalProperties: false },
)

export const AuthorListResponseSchema = t.Object(
	{
		data: t.Array(AuthorPlain),
	},
	{ additionalProperties: false },
)

export type AuthorPlain = Static<typeof AuthorPlain>
export type AuthorResponse = Static<typeof AuthorResponseSchema>
export type AuthorListResponse = Static<typeof AuthorListResponseSchema>
