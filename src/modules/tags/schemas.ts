import { TagGroupEnum } from '@db/prisma/enums'
import { type Static, t } from 'elysia'

export const TagGroupEnumSchema = t.Enum(TagGroupEnum)

export const TagCreatePlainInputSchema = t.Object(
	{
		name: t.String(),
		description: t.Nullable(t.String()),
		group: TagGroupEnumSchema,
	},
	{ additionalProperties: false },
)

export const TagUpdatePlainInputSchema = t.Partial(TagCreatePlainInputSchema, {
	additionalProperties: false,
	minProperties: 1,
})

export const TagPlain = t.Object({
	id: t.String(),
	name: t.String(),
	description: t.Nullable(t.String()),
	group: TagGroupEnumSchema,
})

export const TagResponseSchema = t.Object(
	{
		data: TagPlain,
	},
	{ additionalProperties: false },
)

export const TagListResponseSchema = t.Object(
	{
		data: t.Array(TagPlain),
	},
	{ additionalProperties: false },
)

export type TagPlain = Static<typeof TagPlain>
export type TagResponse = Static<typeof TagResponseSchema>
export type TagListResponse = Static<typeof TagListResponseSchema>
