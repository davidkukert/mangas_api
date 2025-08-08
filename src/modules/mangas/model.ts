import { FollowStatusEnum } from '@db/schemas/FollowStatusEnum'
import { MangaAuthorRoleEnum } from '@db/schemas/MangaAuthorRoleEnum'
import {
	MangaInclude,
	MangaOrderBy,
	MangaPlainInputCreate,
	MangaPlainInputUpdate,
} from '@modules/mangas/schemas'
import Elysia, { t } from 'elysia'

export const MangaModel = new Elysia({ name: 'Model.Manga' }).model({
	'manga.create': MangaPlainInputCreate,
	'manga.update': MangaPlainInputUpdate,
	'manga.author.add': t.Object({
		role: MangaAuthorRoleEnum,
	}),
	'manga.follow.atts': t.Object({
		status: t.Optional(FollowStatusEnum),
	}),
	'manga.query': t.Partial(
		t.Object(
			{
				include: MangaInclude,
				orderBy: MangaOrderBy,
			},
			{ additionalProperties: false },
		),
	),
})
