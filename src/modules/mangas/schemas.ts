import { __nullable__, __transformDate__ } from '@app/schemas'
import { ChapterPlain } from '@modules/chapters/schemas'
import { TagPlain } from '@modules/tags/schemas'
import { t } from 'elysia'

export const ContentRatingEnum = t.Union(
	[
		t.Literal('safe'),
		t.Literal('suggestive'),
		t.Literal('erotica'),
		t.Literal('pornographic'),
	],
	{ additionalProperties: false },
)

export const DemographicEnum = t.Union(
	[
		t.Literal('shounen'),
		t.Literal('shoujo'),
		t.Literal('seinen'),
		t.Literal('josei'),
	],
	{ additionalProperties: false },
)

export const StatusEnum = t.Union(
	[
		t.Literal('ongoing'),
		t.Literal('completed'),
		t.Literal('hiatus'),
		t.Literal('cancelled'),
	],
	{ additionalProperties: false },
)

export const StateEnum = t.Union(
	[
		t.Literal('draft'),
		t.Literal('published'),
		t.Literal('submitted'),
		t.Literal('rejected'),
	],
	{ additionalProperties: false },
)

export const MangaAuthorRoleEnum = t.Union(
	[t.Literal('author'), t.Literal('artist')],
	{ additionalProperties: false },
)

export const FollowStatusEnum = t.Union(
	[
		t.Literal('reading'),
		t.Literal('completed'),
		t.Literal('onHold'),
		t.Literal('dropped'),
		t.Literal('planToRead'),
	],
	{ additionalProperties: false },
)

export const MangaPlain = t.Object(
	{
		id: t.String(),
		title: t.String(),
		alternativeTitles: t.Array(t.String(), { additionalProperties: false }),
		description: __nullable__(t.String()),
		originalLanguage: t.String(),
		publicationDemographic: __nullable__(DemographicEnum),
		status: StatusEnum,
		year: __nullable__(t.Integer()),
		contentRating: ContentRatingEnum,
		state: StateEnum,
		createdAt: t.Date(),
		updatedAt: t.Date(),
	},
	{ additionalProperties: false },
)

export const MangaAuthorPlain = t.Object(
	{
		id: t.Integer(),
		mangaId: t.String(),
		authorId: t.String(),
		role: MangaAuthorRoleEnum,
	},
	{ additionalProperties: false },
)

export const MangaFollowerPlain = t.Object(
	{
		id: t.Integer(),
		mangaId: t.String(),
		followerId: t.String(),
		status: FollowStatusEnum,
	},
	{ additionalProperties: false },
)

export const MangaRelations = t.Object(
	{
		authors: t.Array(MangaAuthorPlain, { additionalProperties: false }),
		tags: t.Array(TagPlain, { additionalProperties: false }),
		followers: t.Array(MangaFollowerPlain, { additionalProperties: false }),
		chapters: t.Array(ChapterPlain, { additionalProperties: false }),
	},
	{ additionalProperties: false },
)

export const MangaPlainInputCreate = t.Object(
	{
		title: t.String(),
		alternativeTitles: t.Optional(
			t.Array(t.String(), { additionalProperties: false }),
		),
		description: t.Optional(__nullable__(t.String())),
		originalLanguage: t.String(),
		publicationDemographic: t.Optional(__nullable__(DemographicEnum)),
		status: StatusEnum,
		year: t.Optional(__nullable__(t.Integer())),
		contentRating: ContentRatingEnum,
		state: StateEnum,
	},
	{ additionalProperties: false },
)

export const MangaPlainInputUpdate = t.Object(
	{
		title: t.Optional(t.String()),
		alternativeTitles: t.Optional(
			t.Array(t.String(), { additionalProperties: false }),
		),
		description: t.Optional(__nullable__(t.String())),
		originalLanguage: t.Optional(t.String()),
		publicationDemographic: t.Optional(__nullable__(DemographicEnum)),
		status: t.Optional(StatusEnum),
		year: t.Optional(__nullable__(t.Integer())),
		contentRating: t.Optional(ContentRatingEnum),
		state: t.Optional(StateEnum),
	},
	{ additionalProperties: false },
)

export const MangaRelationsInputCreate = t.Object(
	{
		authors: t.Optional(
			t.Object(
				{
					connect: t.Array(
						t.Object(
							{
								id: t.Integer({ additionalProperties: false }),
							},
							{ additionalProperties: false },
						),
						{ additionalProperties: false },
					),
				},
				{ additionalProperties: false },
			),
		),
		tags: t.Optional(
			t.Object(
				{
					connect: t.Array(
						t.Object(
							{
								id: t.String({ additionalProperties: false }),
							},
							{ additionalProperties: false },
						),
						{ additionalProperties: false },
					),
				},
				{ additionalProperties: false },
			),
		),
		followers: t.Optional(
			t.Object(
				{
					connect: t.Array(
						t.Object(
							{
								id: t.Integer({ additionalProperties: false }),
							},
							{ additionalProperties: false },
						),
						{ additionalProperties: false },
					),
				},
				{ additionalProperties: false },
			),
		),
		chapters: t.Optional(
			t.Object(
				{
					connect: t.Array(
						t.Object(
							{
								id: t.String({ additionalProperties: false }),
							},
							{ additionalProperties: false },
						),
						{ additionalProperties: false },
					),
				},
				{ additionalProperties: false },
			),
		),
	},
	{ additionalProperties: false },
)

export const MangaRelationsInputUpdate = t.Partial(
	t.Object(
		{
			authors: t.Partial(
				t.Object(
					{
						connect: t.Array(
							t.Object(
								{
									id: t.Integer({ additionalProperties: false }),
								},
								{ additionalProperties: false },
							),
							{ additionalProperties: false },
						),
						disconnect: t.Array(
							t.Object(
								{
									id: t.Integer({ additionalProperties: false }),
								},
								{ additionalProperties: false },
							),
							{ additionalProperties: false },
						),
					},
					{ additionalProperties: false },
				),
			),
			tags: t.Partial(
				t.Object(
					{
						connect: t.Array(
							t.Object(
								{
									id: t.String({ additionalProperties: false }),
								},
								{ additionalProperties: false },
							),
							{ additionalProperties: false },
						),
						disconnect: t.Array(
							t.Object(
								{
									id: t.String({ additionalProperties: false }),
								},
								{ additionalProperties: false },
							),
							{ additionalProperties: false },
						),
					},
					{ additionalProperties: false },
				),
			),
			followers: t.Partial(
				t.Object(
					{
						connect: t.Array(
							t.Object(
								{
									id: t.Integer({ additionalProperties: false }),
								},
								{ additionalProperties: false },
							),
							{ additionalProperties: false },
						),
						disconnect: t.Array(
							t.Object(
								{
									id: t.Integer({ additionalProperties: false }),
								},
								{ additionalProperties: false },
							),
							{ additionalProperties: false },
						),
					},
					{ additionalProperties: false },
				),
			),
			chapters: t.Partial(
				t.Object(
					{
						connect: t.Array(
							t.Object(
								{
									id: t.String({ additionalProperties: false }),
								},
								{ additionalProperties: false },
							),
							{ additionalProperties: false },
						),
						disconnect: t.Array(
							t.Object(
								{
									id: t.String({ additionalProperties: false }),
								},
								{ additionalProperties: false },
							),
							{ additionalProperties: false },
						),
					},
					{ additionalProperties: false },
				),
			),
		},
		{ additionalProperties: false },
	),
)

export const MangaWhere = t.Partial(
	t.Recursive(
		(Self) =>
			t.Object(
				{
					AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
					NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
					OR: t.Array(Self, { additionalProperties: false }),
					id: t.String(),
					title: t.String(),
					alternativeTitles: t.Array(t.String(), {
						additionalProperties: false,
					}),
					description: t.String(),
					originalLanguage: t.String(),
					publicationDemographic: DemographicEnum,
					status: StatusEnum,
					year: t.Integer(),
					contentRating: ContentRatingEnum,
					state: StateEnum,
					createdAt: t.Date(),
					updatedAt: t.Date(),
				},
				{ additionalProperties: false },
			),
		{ $id: 'Manga' },
	),
)

export const MangaWhereUnique = t.Recursive(
	(Self) =>
		t.Intersect(
			[
				t.Partial(
					t.Object(
						{ id: t.String(), title: t.String() },
						{ additionalProperties: false },
					),
					{ additionalProperties: false },
				),
				t.Union(
					[t.Object({ id: t.String() }), t.Object({ title: t.String() })],
					{ additionalProperties: false },
				),
				t.Partial(
					t.Object({
						AND: t.Union([
							Self,
							t.Array(Self, { additionalProperties: false }),
						]),
						NOT: t.Union([
							Self,
							t.Array(Self, { additionalProperties: false }),
						]),
						OR: t.Array(Self, { additionalProperties: false }),
					}),
					{ additionalProperties: false },
				),
				t.Partial(
					t.Object(
						{
							id: t.String(),
							title: t.String(),
							alternativeTitles: t.Array(t.String(), {
								additionalProperties: false,
							}),
							description: t.String(),
							originalLanguage: t.String(),
							publicationDemographic: DemographicEnum,
							status: StatusEnum,
							year: t.Integer(),
							contentRating: ContentRatingEnum,
							state: StateEnum,
							createdAt: t.Date(),
							updatedAt: t.Date(),
						},
						{ additionalProperties: false },
					),
				),
			],
			{ additionalProperties: false },
		),
	{ $id: 'Manga' },
)

export const MangaSelect = t.Partial(
	t.Object(
		{
			id: t.Boolean(),
			title: t.Boolean(),
			alternativeTitles: t.Boolean(),
			description: t.Boolean(),
			originalLanguage: t.Boolean(),
			publicationDemographic: t.Boolean(),
			status: t.Boolean(),
			year: t.Boolean(),
			contentRating: t.Boolean(),
			state: t.Boolean(),
			createdAt: t.Boolean(),
			updatedAt: t.Boolean(),
			authors: t.Boolean(),
			tags: t.Boolean(),
			followers: t.Boolean(),
			chapters: t.Boolean(),
			_count: t.Boolean(),
		},
		{ additionalProperties: false },
	),
)

export const MangaInclude = t.Partial(
	t.Object(
		{
			publicationDemographic: t.Boolean(),
			status: t.Boolean(),
			contentRating: t.Boolean(),
			state: t.Boolean(),
			authors: t.Boolean(),
			tags: t.Boolean(),
			followers: t.Boolean(),
			chapters: t.Boolean(),
			_count: t.Boolean(),
		},
		{ additionalProperties: false },
	),
)

export const MangaOrderBy = t.Partial(
	t.Object(
		{
			id: t.Union([t.Literal('asc'), t.Literal('desc')], {
				additionalProperties: false,
			}),
			title: t.Union([t.Literal('asc'), t.Literal('desc')], {
				additionalProperties: false,
			}),
			alternativeTitles: t.Union([t.Literal('asc'), t.Literal('desc')], {
				additionalProperties: false,
			}),
			description: t.Union([t.Literal('asc'), t.Literal('desc')], {
				additionalProperties: false,
			}),
			originalLanguage: t.Union([t.Literal('asc'), t.Literal('desc')], {
				additionalProperties: false,
			}),
			year: t.Union([t.Literal('asc'), t.Literal('desc')], {
				additionalProperties: false,
			}),
			createdAt: t.Union([t.Literal('asc'), t.Literal('desc')], {
				additionalProperties: false,
			}),
			updatedAt: t.Union([t.Literal('asc'), t.Literal('desc')], {
				additionalProperties: false,
			}),
		},
		{ additionalProperties: false },
	),
)

export const Manga = t.Composite([MangaPlain, MangaRelations], {
	additionalProperties: false,
})

export const MangaInputCreate = t.Composite(
	[MangaPlainInputCreate, MangaRelationsInputCreate],
	{ additionalProperties: false },
)

export const MangaInputUpdate = t.Composite(
	[MangaPlainInputUpdate, MangaRelationsInputUpdate],
	{ additionalProperties: false },
)
