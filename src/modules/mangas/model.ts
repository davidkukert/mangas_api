import { MangaAuthorRoleEnum } from '@db/prisma/enums'
import Elysia, { t } from 'elysia'
import {
	MangaAuthorQueryRouteSchema,
	MangaCreatePlainInputSchema,
	MangaListResponseSchema,
	MangaPlain,
	MangaResponseSchema,
	MangaUpdatePlainInputSchema,
} from './schemas'

export const MangaAuthorRoleEnumSchema = t.Enum(MangaAuthorRoleEnum)

export const MangaModel = new Elysia({ name: 'manga-model' }).model({
	MangaCreatePlainInput: MangaCreatePlainInputSchema,
	MangaUpdatePlainInput: MangaUpdatePlainInputSchema,
	Manga: MangaPlain,
	MangaResponse: MangaResponseSchema,
	MangaListResponse: MangaListResponseSchema,
	MangaAuthorQueryRoute: MangaAuthorQueryRouteSchema,
})
