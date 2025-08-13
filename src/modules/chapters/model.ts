import Elysia from 'elysia'
import {
	ChapterCreatePlainInputSchema,
	ChapterListResponseSchema,
	ChapterPlain,
	ChapterResponseSchema,
	ChapterUpdatePlainInputSchema,
} from './schemas'

export const ChapterModel = new Elysia({ name: 'chapter-model' }).model({
	ChapterCreatePlainInput: ChapterCreatePlainInputSchema,
	ChapterUpdatePlainInput: ChapterUpdatePlainInputSchema,
	Chapter: ChapterPlain,
	ChapterResponse: ChapterResponseSchema,
	ChapterListResponse: ChapterListResponseSchema,
})
