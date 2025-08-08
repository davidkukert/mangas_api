import { __nullable__, __transformDate__ } from '@app/schemas'
import { AuthorPlain } from '@modules/authors/schemas'
import { ReadingHistoryPlain } from '@modules/chapters/schemas'
import { MangaFollowerPlain } from '@modules/mangas/schemas'
import { t } from 'elysia'

export const RoleEnum = t.Union([t.Literal('reader'), t.Literal('admin')], {
	additionalProperties: false,
})

export const UserPlain = t.Object(
	{
		id: t.String(),
		username: t.String(),
		password: t.String(),
		role: RoleEnum,
		createdAt: t.Date(),
		updatedAt: t.Date(),
	},
	{ additionalProperties: false },
)

export const UserRelations = t.Object(
	{
		followingMangas: t.Array(MangaFollowerPlain, {
			additionalProperties: false,
		}),
		readingHistory: t.Array(ReadingHistoryPlain, {
			additionalProperties: false,
		}),
		authorProfile: __nullable__(AuthorPlain),
	},
	{ additionalProperties: false },
)

export const UserPlainInputCreate = t.Object(
	{ username: t.String(), password: t.String() },
	{ additionalProperties: false },
)

export const UserPlainInputUpdate = t.Object(
	{ username: t.Optional(t.String()), password: t.Optional(t.String()) },
	{ additionalProperties: false },
)

export const UserRelationsInputCreate = t.Object(
	{
		followingMangas: t.Optional(
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
		readingHistory: t.Optional(
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
		authorProfile: t.Optional(
			t.Object(
				{
					connect: t.Object(
						{
							id: t.String({ additionalProperties: false }),
						},
						{ additionalProperties: false },
					),
				},
				{ additionalProperties: false },
			),
		),
	},
	{ additionalProperties: false },
)

export const UserRelationsInputUpdate = t.Partial(
	t.Object(
		{
			followingMangas: t.Partial(
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
			readingHistory: t.Partial(
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
			authorProfile: t.Partial(
				t.Object(
					{
						connect: t.Object(
							{
								id: t.String({ additionalProperties: false }),
							},
							{ additionalProperties: false },
						),
						disconnect: t.Boolean(),
					},
					{ additionalProperties: false },
				),
			),
		},
		{ additionalProperties: false },
	),
)

export const UserWhere = t.Partial(
	t.Recursive(
		(Self) =>
			t.Object(
				{
					AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
					NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
					OR: t.Array(Self, { additionalProperties: false }),
					id: t.String(),
					username: t.String(),
					password: t.String(),
					role: t.Union([t.Literal('reader'), t.Literal('admin')], {
						additionalProperties: false,
					}),
					createdAt: t.Date(),
					updatedAt: t.Date(),
				},
				{ additionalProperties: false },
			),
		{ $id: 'User' },
	),
)

export const UserWhereUnique = t.Recursive(
	(Self) =>
		t.Intersect(
			[
				t.Partial(
					t.Object(
						{ id: t.String(), username: t.String() },
						{ additionalProperties: false },
					),
					{ additionalProperties: false },
				),
				t.Union(
					[t.Object({ id: t.String() }), t.Object({ username: t.String() })],
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
							username: t.String(),
							password: t.String(),
							role: RoleEnum,
							createdAt: t.Date(),
							updatedAt: t.Date(),
						},
						{ additionalProperties: false },
					),
				),
			],
			{ additionalProperties: false },
		),
	{ $id: 'User' },
)

export const UserSelect = t.Partial(
	t.Object(
		{
			id: t.Boolean(),
			username: t.Boolean(),
			password: t.Boolean(),
			role: t.Boolean(),
			createdAt: t.Boolean(),
			updatedAt: t.Boolean(),
			followingMangas: t.Boolean(),
			readingHistory: t.Boolean(),
			authorProfile: t.Boolean(),
			_count: t.Boolean(),
		},
		{ additionalProperties: false },
	),
)

export const UserInclude = t.Partial(
	t.Object(
		{
			role: t.Boolean(),
			followingMangas: t.Boolean(),
			readingHistory: t.Boolean(),
			authorProfile: t.Boolean(),
			_count: t.Boolean(),
		},
		{ additionalProperties: false },
	),
)

export const UserOrderBy = t.Partial(
	t.Object(
		{
			id: t.Union([t.Literal('asc'), t.Literal('desc')], {
				additionalProperties: false,
			}),
			username: t.Union([t.Literal('asc'), t.Literal('desc')], {
				additionalProperties: false,
			}),
			password: t.Union([t.Literal('asc'), t.Literal('desc')], {
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

export const User = t.Composite([UserPlain, UserRelations], {
	additionalProperties: false,
})

export const UserInputCreate = t.Composite(
	[UserPlainInputCreate, UserRelationsInputCreate],
	{ additionalProperties: false },
)

export const UserInputUpdate = t.Composite(
	[UserPlainInputUpdate, UserRelationsInputUpdate],
	{ additionalProperties: false },
)
