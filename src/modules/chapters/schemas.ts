import { type Static, t } from 'elysia'

export const ChapterCreatePlainInputSchema = t.Object(
	{
		number: t.String({ pattern: '^[0-9]+(\\.[0-9]+)?$' }),
		title: t.Nullable(t.String()),
		volume: t.Nullable(t.String()),
		pages: t.Integer({ minimum: 0 }),
		translatedLanguage: t.String({ minLength: 2, maxLength: 4 }),
		mangaId: t.String(),
	},
	{ additionalProperties: false },
)

export const ChapterUpdatePlainInputSchema = t.Partial(
	ChapterCreatePlainInputSchema,
	{
		additionalProperties: false,
		minProperties: 1,
	},
)

export const ChapterPlain = t.Object({
	id: t.String(),
	number: t.String({ pattern: '^[0-9]+(\\.[0-9]+)?$' }),
	title: t.Nullable(t.String()),
	volume: t.Nullable(t.String()),
	pages: t.Integer({ minimum: 0 }),
	translatedLanguage: t.String({ minLength: 2, maxLength: 4 }),
	mangaId: t.String(),
	createdAt: t.Date(),
	updatedAt: t.Date(),
})

export const ChapterResponseSchema = t.Object(
	{
		data: ChapterPlain,
	},
	{ additionalProperties: false },
)

export const ChapterListResponseSchema = t.Object(
	{
		data: t.Array(ChapterPlain),
	},
	{ additionalProperties: false },
)

export type ChapterPlain = Static<typeof ChapterPlain>
export type ChapterResponse = Static<typeof ChapterResponseSchema>
export type ChapterListResponse = Static<typeof ChapterListResponseSchema>
