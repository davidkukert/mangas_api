import { MangaPlainInputCreate, MangaPlainInputUpdate } from '@db/schemas/Manga'
import { MangaAuthorRoleEnum } from '@db/schemas/MangaAuthorRoleEnum'
import Elysia, { t } from 'elysia'

export const MangaModel = new Elysia({ name: 'Model.Manga' }).model({
	'manga.create': MangaPlainInputCreate,
	'manga.update': MangaPlainInputUpdate,
	'manga.author.add': t.Object({
		role: MangaAuthorRoleEnum,
	}),
})
