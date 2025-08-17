import {
	ContentRatingEnum,
	DemographicEnum,
	FollowStatusEnum,
	MangaAuthorRoleEnum,
	StateEnum,
	StatusEnum,
} from '@db/prisma/enums'
import { t } from 'elysia'

export const StatusEnumSchema = t.Enum(StatusEnum)
export const ContentRatingEnumSchema = t.Enum(ContentRatingEnum)
export const StateEnumSchema = t.Enum(StateEnum)
export const DemographicEnumSchema = t.Enum(DemographicEnum)

export const MangaCreatePlainInputSchema = t.Object(
	{
		title: t.String(),
		alternativeTitles: t.Array(t.String()),
		description: t.Union([t.String(), t.Null()]),
		originalLanguage: t.String(),
		publicationDemographic: t.Union([DemographicEnumSchema, t.Null()]),
		status: StatusEnumSchema,
		year: t.Union([t.Number(), t.Null()]),
		contentRating: ContentRatingEnumSchema,
		state: StateEnumSchema,
	},
	{ additionalProperties: false },
)
export const MangaUpdatePlainInputSchema = t.Partial(
	MangaCreatePlainInputSchema,
	{
		additionalProperties: false,
		minProperties: 1,
	},
)

export const MangaPlain = t.Object({
	id: t.String(),
	title: t.String(),
	alternativeTitles: t.Array(t.String()),
	description: t.Union([t.String(), t.Null()]),
	originalLanguage: t.String(),
	publicationDemographic: t.Union([DemographicEnumSchema, t.Null()]),
	status: StatusEnumSchema,
	year: t.Union([t.Number(), t.Null()]),
	contentRating: ContentRatingEnumSchema,
	state: StateEnumSchema,
	createdAt: t.Date(),
	updatedAt: t.Date(),
})

export const MangaResponseSchema = t.Object(
	{
		data: MangaPlain,
	},
	{ additionalProperties: false },
)

export const MangaListResponseSchema = t.Object(
	{
		data: t.Array(MangaPlain),
	},
	{ additionalProperties: false },
)

export const MangaAuthorRoleEnumSchema = t.Enum(MangaAuthorRoleEnum, {
	default: MangaAuthorRoleEnum.AUTHOR,
})

export const MangaAuthorQueryRouteSchema = t.Object(
	{
		role: MangaAuthorRoleEnumSchema,
	},
	{ additionalProperties: false },
)

export const FollowStatusEnumSchema = t.Enum(FollowStatusEnum)

export const MangaFollowQueryRouteSchema = t.Object({
	status: t.Optional(FollowStatusEnumSchema),
})
