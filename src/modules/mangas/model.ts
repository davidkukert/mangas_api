import Elysia from 'elysia'
import {
	MangaCreatePlainInputSchema,
	MangaListResponseSchema,
	MangaPlain,
	MangaResponseSchema,
	MangaUpdatePlainInputSchema,
} from './schemas'

export const MangaModel = new Elysia({ name: 'manga-model' }).model({
	MangaCreatePlainInput: MangaCreatePlainInputSchema,
	MangaUpdatePlainInput: MangaUpdatePlainInputSchema,
	Manga: MangaPlain,
	MangaResponse: MangaResponseSchema,
	MangaListResponse: MangaListResponseSchema,
})
