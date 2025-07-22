import { MangaPlainInputCreate, MangaPlainInputUpdate } from '@db/schemas/Manga'
import Elysia from 'elysia'

export const MangaModel = new Elysia({ name: 'Model.Manga' }).model({
	'manga.create': MangaPlainInputCreate,
	'manga.update': MangaPlainInputUpdate,
})
